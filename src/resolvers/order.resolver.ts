import { MinLength } from "class-validator";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Order, OrderStatus } from "../entities/Order.entities";
import { OrderItem } from "../entities/OrderItem.entities";
import { Product } from "../entities/Product.entities";
import { MyContext } from "../types";

@InputType()
class ProductPayload {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  quantity: number;
}

@InputType({ description: "Order payload needed" })
class OrderInput {
  @Field()
  @MinLength(2)
  customerEmail: string;

  @Field(() => [ProductPayload])
  products: ProductPayload[];
}

@ObjectType()
class GetOrderResponse implements Partial<Order> {}

@Resolver(Order)
export class OrderResolver {
  @FieldResolver(() => [OrderItem], { nullable: true })
  async orderItem(@Root() order: Order) {
    return order.items;
  }

  @Query(() => Order, { nullable: true })
  async getOrderByEmail(
    @Arg("email", () => String) email: string
  ): Promise<GetOrderResponse | undefined> {
    const order = await Order.createQueryBuilder()
      .select(["order.id", "order.customerEmail", "order.status"])
      .addSelect([
        "product.id",
        "product.title",
        "product.price",
        "product.description",
        "product.quantity",
        "product.picture",
      ])
      .from(Order, "order")
      .leftJoinAndSelect("order.items", "orderItem")
      .leftJoinAndSelect("orderItem.product", "product")
      .where("order.customerEmail = :customerEmail", { customerEmail: email })
      .getOne();

    return order;
  }

  @Mutation(() => Order)
  async createOrder(
    @Arg("input") input: OrderInput,
    @Ctx() { productLoader }: MyContext
  ): Promise<Order> {
    const { customerEmail, products } = input;

    // save db calls to verify if product with the ids actually exist in db
    let cachedProduct = (await productLoader.loadMany(
      products.map((r) => r.id)
    )) as Product[];

    cachedProduct.filter((obj) => obj !== undefined);

    const order = new Order();
    order.customerEmail = customerEmail;
    order.status = OrderStatus.pending;
    order.items = [];

    for (const product of cachedProduct) {
      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = product.quantity;

      order.items.push(orderItem);
    }

    const newOrder = await Order.save(order);

    const orderItems = products.map((product) => {
      return { order: newOrder, product: product, quantity: product.quantity };
    });

    await OrderItem.insert(orderItems);

    return newOrder;
  }
}

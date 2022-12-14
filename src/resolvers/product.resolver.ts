import { MinLength } from "class-validator";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql";
import { Product } from "../entities/Product.entities";

@InputType()
export class ProductInput {
  @Field()
  @MinLength(2)
  title: string;
  @Field()
  @MinLength(2)
  description: string;
  @Field()
  price: number;
  @Field()
  quantity: number;
  @Field()
  picture: string;
}

export enum Sorting {
  ASC = "ASC",
  DESC = "DESC",
}

registerEnumType(Sorting, {
  name: "Sorting",
  description: "Sort by price",
});

@InputType({ description: "Filter by title description, and sorting by price" })
class ProductSearchInput {
  @Field({ nullable: true })
  @MinLength(2)
  title: string;
  @Field({ nullable: true })
  description: string;
  @Field(() => Sorting, { nullable: true })
  sort: Sorting;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product], { nullable: true })
  async searchProduct(
    @Arg("input", { nullable: true, validate: false })
    { description, title, sort }: ProductSearchInput
  ): Promise<Product[] | undefined> {
    const query = Product.createQueryBuilder("product");

    if (sort === Sorting.ASC) {
      query.orderBy("product.price", "ASC");
    } else if (sort === Sorting.DESC) {
      query.orderBy("product.price", "DESC");
    } else {
      query.orderBy("product.price", "ASC");
    }

    if (title) {
      query.where("product.title ILIKE :title", { title: `%${title}%` });
    }
    if (description) {
      query.andWhere("product.description ILIKE :description", {
        description: `%${description}%`,
      });
    }

    return query.getMany();
  }

  @Query(() => Product, { nullable: true })
  async getProductById(
    @Arg("productId", () => Int) productId: number
  ): Promise<Product | undefined> {
    return Product.findOne(productId);
  }

  @Mutation(() => Product)
  async createProduct(@Arg("input") input: ProductInput): Promise<Product> {
    return Product.create({ ...input }).save();
  }
}

import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Order } from "./Order.entities";
import { Product } from "./Product.entities";

@ObjectType()
@Entity()
export class OrderItem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  orderId: number;

  @Field(() => Order)
  @ManyToOne(() => Order)
  order: Order;

  @Field()
  @Column()
  productId: number;

  @Field(() => Product)
  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

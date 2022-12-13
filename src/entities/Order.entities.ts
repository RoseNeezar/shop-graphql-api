import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem.entities";

export enum OrderStatus {
  pending = "PENDING",
  cancelled = "CANCELLED",
  completed = "COMPLETED",
}

registerEnumType(OrderStatus, {
  name: "OrderStatus",
  description: "Sort by price",
});

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  customerEmail!: string;

  @Field(() => OrderStatus, { defaultValue: OrderStatus.pending })
  @Column()
  status!: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  getTotalCost(): number {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  @Field(() => String)
  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

import DataLoader from "dataloader";
import { OrderItem } from "../entities/OrderItem.entities";

export const createOrderItem = () =>
  new DataLoader<number, OrderItem>(async (itemId) => {
    const orderItems = await OrderItem.findByIds(itemId as number[]);
    const orderIdToOrderItem: Record<string, OrderItem> = {};

    orderItems.forEach((u) => {
      orderIdToOrderItem[u.orderId] = u;
    });

    const sortedProducts = itemId.map((u) => orderIdToOrderItem[u]);
    return sortedProducts;
  });

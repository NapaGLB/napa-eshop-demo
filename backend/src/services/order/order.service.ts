import { Injectable } from '@nestjs/common';
import { LatestBlockReposity } from 'src/models/latestBlock/latestBlock.reposity';
import { IOrder, IUpdateOrderStatus } from 'src/models/order/order.interface';
import { OrderReposity } from 'src/models/order/order.reposity';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepo: OrderReposity,
    private readonly latestBlockRepo: LatestBlockReposity,
  ) {}

  async createOrder(historyData: IOrder) {
    return await this.orderRepo.create(historyData);
  }

  async getAllOrders({ status, address, type }) {
    let allOrders = await this.orderRepo.getAll();
    let orders: any;
    if (type == 'shipper' || type == 'seller') {
      orders = allOrders.filter((item) => {
        return item.status == status;
      });
    } else {
      orders = allOrders.filter((item) => {
        return item.status == status && item[type] == address;
      });
    }

    return orders.sort((a, b) => b.createdAt - a.createdAt);
  }

  async getOrdersAllBuyer() {
    let allOrders = await this.orderRepo.getAll();
    return allOrders.sort((a, b) => b.createdAt - a.createdAt);
  }

  async getOrderById(orderId: string) {
    let orders = await this.orderRepo.getAll();
    const order = orders.filter((item) => {
      return item.id === orderId;
    });
    return order;
  }

  async updateOrderStatus(data: IUpdateOrderStatus) {
    let orders = await this.orderRepo.getAll();
    let order = orders.filter((item) => {
      return item.id === data.id;
    });

    if (order.length > 0) {
      let myOrder = order[0];
      myOrder.status = data.status;
      await this.orderRepo.updateOrderStatus(myOrder);
      return {
        status: 200,
      };
    }
    return {
      status: 500,
      message: `There are no order with id ${data.id}`,
    };
  }

  async getLatestBlock(): Promise<number> {
    return this.latestBlockRepo.get();
  }

  async syncLatestBlock(blockNumber: number) {
    return this.latestBlockRepo.sync(blockNumber);
  }
}

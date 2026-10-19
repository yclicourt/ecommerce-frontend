import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartItem } from '@features/orders/interfaces/cart-item.interface';
import { INTENT } from '@features/orders/enums/intent.enum';
import { CaptureOrderResponse } from '@features/orders/interfaces/capture-order.interface';
import { MonthlyRevenue } from '@features/orders/interfaces/monthly-revenue.interface';
import { OrderStats } from '@features/orders/interfaces/order-stast.interface';
import { Order } from '@features/orders/interfaces/order.interface';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // Inject Services
  http = inject(HttpClient);
  configService = inject(ConfigService)
  orders: Order[] = [];

  constructor() {}

  // Method to create order
  createOrder(
    cartItems: CartItem[],
    token: string | null
  ): Observable<{ order: Order; approval_url: string }> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const order = {
      intent: INTENT.CAPTURE,
      purchase_units: cartItems.map((item, index) => ({
        reference_id: `ref_${index}_${Date.now()}`,
        amount: {
          currency_code: 'USD',
          value: (item.price * item.quantity).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: (item.price * item.quantity).toFixed(2),
            },
          },
        },
        items: [
          {
            name: item.name,
            unit_amount: {
              currency_code: 'USD',
              value: item.price.toFixed(2),
            },
            quantity: item.quantity,
          },
        ],
      })),
      application_context: {
        return_url: `${this.configService.clientUrl}/order/success`,
        cancel_url: `${this.configService.clientUrl}/order/cancel`,
        brand_name: this.configService.brandName,
        user_action: 'PAY_NOW',
      },
    };

    return this.http.post<{ order: Order; approval_url: string }>(
      `${this.configService.clientUrl}/create-order`,
      order,
      { headers }
    );
  }
  // Method to capture order
  captureOrder(token: string | null): Observable<CaptureOrderResponse> {
    return this.http.get<CaptureOrderResponse>(
      `${this.configService.clientUrl}/capture-order?token=${token}`
    );
  }

  // Method to cancel order
  cancelOrder() {
    return this.http.get<Order>(`${this.configService.clientUrl}/cancel-order`);
  }

  // Method to get stats of all orders
  getOrdersStats(userId: number): Observable<OrderStats[]> {
    return this.http.get<OrderStats[]>(`${this.configService.clientUrl}/stats/${userId}`);
  }

  // Method to get monthly revenue
  getMonthlyRevenue(userId: number): Observable<MonthlyRevenue[]> {
    return this.http.get<MonthlyRevenue[]>(`${this.configService.clientUrl}/revenue/${userId}`);
  }
}

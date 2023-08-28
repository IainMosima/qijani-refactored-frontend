import { OrderStructure, newOrder } from "../models/order";
import { fetchData } from "./fetchData";

// getting all orders
export async function getOrders(): Promise<OrderStructure[]> {
    const response = await fetchData('/api/v1/orders/', { method: 'GET' });
    return response.json();
}

// creating a new order
export async function createOrder(OrderBody: newOrder, packageId: string) {
    const response = await fetchData(`/api/v1/orders/${packageId}`, 
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(OrderBody)
    });

    return response.json();
}

// deleting an order
export async function cancelOrder (orderId: string) {
    const response = await fetchData(`/api/v1/orders/${orderId}`,{method: 'DELETE'});
    return response;
}
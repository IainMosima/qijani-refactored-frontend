import { fetchData } from "./fetchData";
import { OrderStructure } from "../models/order";

// getting all orders
export async function getOrders(): Promise<OrderStructure[]> {
    const response = await fetchData('/api/v1/orders/', { method: 'GET' });
    return response.json();
}

// creating a new order
export async function createOrder(OrderBody: OrderStructure, packageId: string) {
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
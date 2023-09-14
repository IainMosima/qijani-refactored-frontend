import { OrderStructure, newOrder } from "../models/order";
import { fetchData } from "./fetchData";

// getting all orders
export async function getOrders(token: string): Promise<OrderStructure[]> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/orders/`, { headers: { 'Authorization': 'Bearer ' + token } ,method: 'GET' });
    return response.json();
}

// creating a new order
export async function createOrder(OrderBody: newOrder, packageId: string, token: string) {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/orders/${packageId}`, 
    {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json',
        },
        body: JSON.stringify(OrderBody)
    });

    return response.json();
}

// deleting an order
export async function cancelOrder (orderId: string, token: string) {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/orders/${orderId}`,{headers: { 'Authorization': 'Bearer ' + token }, method: 'DELETE'});
    return response;
}
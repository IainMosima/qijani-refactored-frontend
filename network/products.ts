import { fetchData } from "./fetchData";
import { Product } from "../models/product";

// search function
export async function searchFunction(query: string): Promise<Product[]> {
    const response = await fetchData(`/api/v1/products/query/${query}`);
    return response.json();
}

// fetching all products
export async function fetchProducts(): Promise<Product[]> {
    const response = await fetchData(`/api/v1/products`);
    return response.json();
}

// fetching all categeries
export async function fetchCategories(): Promise<string[]> {
    const response = await fetchData(`${process.env.BACKEND_API}/api/v1/products/availableCategories`, { cache: 'no-store' });
    return response.json();
}

// fetching a category
export async function fetchCategory(category: string, records?: number, server=false): Promise<Product[]> {
    let response;

    if(server) {
        if (records){
            response = await fetchData(`${process.env.BACKEND_API}/api/v1/products/category?category=${category}&records=${records}`, {
                cache: 'no-store'
            });
        } else {
            response = await fetchData(`${process.env.BACKEND_API}/api/v1/products/category?category=${category}`);
        }
    } else {
        if (records){
            response = await fetchData(`/api/v1/products/category?category=${category}&records=${records}`, {
                cache: 'no-store'
            });
        } else {
            response = await fetchData(`/api/v1/products/category?category=${category}`);
        }
    }


    return response.json();
}

// getting a product based on id
export async function getProduct(productId: string): Promise<Product> {
    const response = await fetchData(`/api/v1/products/${productId}`);
    return response.json();
}

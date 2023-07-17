export interface Product {
    _id: string,
    productName: string,
    productImgKey: string,
    categoryName: string,
    price: number,
    available: boolean
}

export interface CategoriesData {
    categoryName: string;
    products: Product[];
}
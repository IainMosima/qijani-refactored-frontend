export interface OrderStructure {
    _id: string,
    userId: string,
    price: string,
    packageId: string,
    paymentStatus: string,
    delivered: boolean,
}

export interface newOrder {
    userId: string,
    price: string,
    packageId: string,
    paymentType: string,
    phoneNumber: string,
}
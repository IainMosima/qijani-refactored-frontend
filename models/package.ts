export interface ItemStructure {
    productId: string,
    price: number
}

export interface NewPackage {
    userId: string,
    packageName: string,
    productId?: string,
    price?: number
}

export interface UpdatedPackage {
    userId: string,
    packageId: string,
    packageName: string,
    items: ItemStructure[],
}
export interface UpdatedPackageResponse {
    success: boolean,
    message: string,
    data: PackageStructure
}

export interface PackageStructure {
    _id: string,
    userId: string,
    packageName: string,
    items?: ItemStructure[]
}
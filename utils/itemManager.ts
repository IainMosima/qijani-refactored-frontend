import { ItemStructure } from "../models/package";

export function itemManager(items: ItemStructure[], productId: string, updatedPrice: number): ItemStructure[] {
    let updatedItems = items.filter(item => item.productId !== productId);
    let itemToUpdate = items.find(item => item.productId === productId) ;
    if (itemToUpdate) {
        // itemToUpdate.price = updatedPrice;
        updatedItems.push({...itemToUpdate, price: updatedPrice});
    } else {
        updatedItems.push({productId, price: updatedPrice});
    }
    return updatedItems;
}

export function removeItem(items: ItemStructure[], productId: string): ItemStructure[] {
    const updatedItems = items.filter(item => item.productId !== productId);
    return updatedItems;
}
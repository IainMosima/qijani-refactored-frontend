import { ItemStructure } from "../models/package";

export function itemManager(items: ItemStructure[], productId: string, updatedPrice: number): ItemStructure[] {
    const updatedItems = items.filter(item => item.productId !== productId);
    const itemToUpdate = items.find(item => item.productId === productId);
    if (itemToUpdate) {
        itemToUpdate.price = updatedPrice;
        updatedItems.push(itemToUpdate);
    } else {
        updatedItems.push({productId, price: updatedPrice});
    }
    return updatedItems;
}

export function removeItem(items: ItemStructure[], productId: string): ItemStructure[] {
    const updatedItems = items.filter(item => item.productId !== productId);
    return updatedItems;
}
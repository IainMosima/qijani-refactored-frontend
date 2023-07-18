import { fetchData } from "./fetchData";
import { NewPackage, PackageStructure, UpdatedPackage } from "../models/package";


// creating new package
export async function createNewPackage(newPackage: NewPackage): Promise<PackageStructure> {
    const response= await fetchData('/api/v1/packages/', 
    {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newPackage)
    });
    return response.json();
}

// updating a package
export async function updatePackage(updateInfo: UpdatedPackage) {
    const updatadedPackage = {
        userId: updateInfo.userId,
        packageName: updateInfo.packageName,
        items: updateInfo.items,
    }
    const response= await fetchData(`/api/v1/packages/${updateInfo.packageId}`,
    {
        method: 'PATCH',
        headers : {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatadedPackage)
    });

    return response.json();
}

// getting all packages
export async function fetchPackages(): Promise<PackageStructure[]> {
    const response = await fetchData('/api/v1/packages');
    return response.json();
}

// deleting a package
export async function deletePackage(packageId: string) {
    const response = await fetchData(`/api/v1/packages/${packageId}`, { method: 'DELETE' });
    return response.json();
}

// getting package
export async function getPackage(packageId: string): Promise<PackageStructure> {
    const response = await fetchData(`/api/v1/packages/${packageId}`);
    return response.json();
}
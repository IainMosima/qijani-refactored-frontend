import { fetchData } from "./fetchData";
import { NewPackage, PackageStructure, UpdatedPackage, UpdatedPackageResponse } from "../models/package";

// creating new package
export async function createNewPackage(newPackage: NewPackage, token: string): Promise<PackageStructure> {
    const response= await fetchData('/api/v1/packages/', 
    {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(newPackage)
    });
    return response.json();
}

// updating a package
export async function updatePackage(updateInfo: UpdatedPackage, token: string): Promise<UpdatedPackageResponse> {
    const updatadedPackage = {
        userId: updateInfo.userId,
        packageName: updateInfo.packageName,
        items: updateInfo.items,
    }
    const response= await fetchData(`/api/v1/packages/${updateInfo.packageId}`,
    {
        method: 'PATCH',
        headers : {
            'Authorization': 'Bearer ' + token,
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatadedPackage)
    });
    
    
    return response.json();
}

// getting all packages
export async function fetchPackages(token: string): Promise<PackageStructure[]> {
    const response = await fetchData('/api/v1/packages', { headers: { 'Authorization': 'Bearer ' + token } ,method: 'GET' });
    return response.json();
}

// deleting a package
export async function deletePackage(packageId: string, token: string) {
    const response = await fetchData(`/api/v1/packages/${packageId}`, { headers: { 'Authorization': 'Bearer ' + token }, method: 'DELETE' });
    return response.json();
}

// getting package
export async function getPackage(packageId: string, token: string): Promise<PackageStructure> {
    const response = await fetchData(`/api/v1/packages/${packageId}`, { headers: { 'Authorization': 'Bearer ' + token } ,method: 'GET' });
    return response.json();
}
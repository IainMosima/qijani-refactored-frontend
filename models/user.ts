export interface User {
    _id: string,
    email: string,
    username: string,
    location: string,
    phoneNumber: number,
    profileImgKey: string,
    county: string,
    area: string,
    landmark: string,
}

export interface updateUser {
    userId: string,
    username: string,
    email: string,
    phoneNumber: string,
    location: string,
    prevPassword: string,
    newPassword: string,
    profileImg: File,
    county: string,
    area: string,
    landmark: string,
}

export interface updatedUser {
    updatedToken: string,
    _id: string,
    email: string,
    username: string,
    location: string,
    phoneNumber: number,
    profileImgKey: string,
    county: string,
    area: string,
    landmark: string,
}
export type BookType = {
    productId: string;
    height: number,
    color: string,
    title: string,
    author: string,
    price: number,
    description: string
}

export type BookListType = {
    products: BookType[],
    success: boolean
}

export type ShoppingCartContextType = {
    data: {
        items: BookType[],
        totalValue: number,
    },
    setData: (data: { items: BookType[], totalValue: number }) => void
}

export type TokenResponseType = {
    token: string,
    success: boolean
}

export type UserType = {
    password: string,
    address: string,
    email: string,
    creditCardNumber: string,
    creditCardValidity: number,
    creditCardCVC: string,
    preferredPickupPointId: string;
}

export type ProfileType = {
    address: string,
    email: string,
    creditCardNumber: string,
    creditCardValidity: number,
    creditCardCVC: string,
    preferredPickupPointId: PickupPointType;
}

export type PickupPointType = {
    pickupPointId: string,
    name: string,
    address: string,
}

export type UserContextType = {
    data: {
        token: string | null
    },
    setData: (data: { token: string | null }) => void
}

export type PackageType = {
    packageId: string,
    status: string,
    books: BookType[],
    items: string[],
    address: string,
}

export type PackageListingType = {
    success: boolean,
    packages: PackageType[]
}
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
    items: BookType[],
    totalValue: number,
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
    id: string,
    name: string,
    address: string,
}

export type UserContextType = {
    token: string | null
}
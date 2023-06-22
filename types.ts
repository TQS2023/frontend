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
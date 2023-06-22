export type BookType = {
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
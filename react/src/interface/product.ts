export interface IProduct {
    id?: string|number,
    nameProduct: string,
    priceProduct: number,
    imageProduct: string,
    categoryId: string,
    discription: string,
    shortDescription: string,
    tinhtrang: string|number
}
export type IProductForm = Omit<IProduct, 'id'>;

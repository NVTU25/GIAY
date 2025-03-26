export interface IOrder {
    id: number|string, 
    userId: number|string,
    username: string,
    phone: string,
    nameProduct: string,
    imageProduct: string,
    priceProduct: number,
    size: number|string,
    total: number,
    address: string,
    quantity: number,
    phuongthucthanhtoan: string,
    phuongthucnhanhang: string,
    trangthai: string,
}
export type IOrderForm = Omit<IOrder, "id">
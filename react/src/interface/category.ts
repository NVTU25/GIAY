export interface ICategory {
    id: string|number,
    nameCategory: string,
    imageCategory: string,
}
export type ICategoryFrom = Omit<ICategory, "id">
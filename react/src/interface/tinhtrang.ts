export interface ITinhtrang {
    id: string|number,
    tinhtrang: string,
}
export type ITinhtrangForm = Omit<ITinhtrang, "id">;
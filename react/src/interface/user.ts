export interface IUser {
    id:number|string,
    username: string,
    email: string,
    phone: number,
    password: string,
    confirmPassword?:string
}
export type IUserForm = Omit<IUser, "id">;
export type ILoginForm = Pick<IUser, "email"|"password">;
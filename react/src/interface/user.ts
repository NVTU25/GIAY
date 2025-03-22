export interface IUser {
    id:number|string,
    username: string,
    email: string,
    phone: number,
    password: string,
    confirmPassword?:string,
    role: "user" | "admin",
}
export type IUserForm = Omit<IUser, "id" | "role">;
export type ILoginForm = Pick<IUser, "email"|"password">;
import { UserModel } from "../models/UserModel";

export interface UserService {
    createUser(user: UserModel): UserModel;
}
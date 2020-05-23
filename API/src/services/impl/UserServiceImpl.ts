import { UserService } from "../UserService";
import { UserModel } from "../../models/UserModel";

export class UserServiceImpl implements UserService {
    createUser(user: import("../../models/UserModel").UserModel): UserModel {
        throw new Error("Method not implemented.");
    }

}
import { BaseController } from "./BaseController";
import { apiController, GET, POST, body, response } from "ts-lambda-api";
import { injectable, inject } from "inversify";
import { TYPES } from "../resources/ioc/types";
import { UserService } from "../services/UserService";
import { CreateUserRequest } from "../requests/CreateUserRequest";

@apiController("/user")
@injectable()
export class UserController extends BaseController {

    constructor(@inject(TYPES.UserService) private readonly userService: UserService) {
        super();
    }

    @GET()
    public async getUsers() {

    }

    // Register function
    @POST()
    public async createUser(@body createUserRequest: CreateUserRequest, @response response: Response) {
        
    }
}

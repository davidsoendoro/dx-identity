import * as path from "path";
import { AppConfig, ApiLambdaApp } from "ts-lambda-api";
import { APIGatewayProxyHandler, APIGatewayEvent, Context } from 'aws-lambda';
import 'source-map-support/register';
import { TYPES } from "./ioc/types";
import { UserServiceImpl } from "../services/impl/UserServiceImpl";

const appConfig = new AppConfig();
appConfig.base = process.env.BASE_URL;
appConfig.version = "v1";

const controllersPath = path.join(__dirname, "../controllers");
const app = new ApiLambdaApp(controllersPath, appConfig);

export const auth: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<any> => {
    return await app.run(event, _context);
}

export const user: APIGatewayProxyHandler = async (event: APIGatewayEvent, _context: Context): Promise<any> => {
    app.configureApp(container => {
        if (!container.isBound(TYPES.UserService)) {
            container.bind(TYPES.UserService).to(UserServiceImpl);
        }
    });
    return await app.run(event, _context);
}

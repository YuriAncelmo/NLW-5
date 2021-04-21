import { UserService } from "../services/UserService"
import { Request, Response } from "express";
class UsersController {

    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        const userService = new UserService();
        const user = await userService.create(email);
        return response.json(user);
    }
}

export { UsersController }
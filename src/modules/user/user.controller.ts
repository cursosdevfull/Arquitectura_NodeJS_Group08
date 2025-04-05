import { Controller } from "../../decorators/controller.decorator";
import { Get } from "../../decorators/get.decorator";
import { Post } from "../../decorators/post.decorator";
import { Request, Response } from "express";

@Controller("/user")
export class UserController {
    username = "JohnDoe";

    @Get("list")
    getAllUsers(req: Request, res: Response) {
        res.json([{ username: "JohnDoe" }, { username: "JaneDoe" }])
    }

    @Post("create")
    createUser(req: Request, res: Response) {
        res.json({ message: "User created" })
    }
}

import "reflect-metadata"
import express, { Request, Response } from "express"
import http from "http"
import { UserController } from "./modules/user/user.controller"

type Route = {
    method: string;
    route: string;
    handler: string
}


const app:any = express()

const controller:any = new UserController()

const path = Reflect.getMetadata("path", UserController)
const routes: Route[] = Reflect.getMetadata("routes", UserController)

app.get("/todo", (req:any, res:any) => {
    res.send("Hello World")
}
)

for(const route of routes) {
    app[route.method](`${path}/${route.route}`, controller[route.handler].bind(controller));
    console.log(`Route registered: ${route.method.toUpperCase()} ${path}/${route.route} -> ${route.handler}`)
}


const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})







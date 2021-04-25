import express from "express";
import './database' //Não precisa colocar o index por que com a raiz já reconhece
import { routes } from "./routes";
import { createServer } from "http";
import { Server, Socket } from "socket.io"
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));//Torna público algo 
app.set("views", path.join(__dirname, "..", "public"));
//Renderização de html
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const httpServer = createServer(app);//Criando server http
const io = new Server(httpServer);//Criando server Websocket

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
})
app.use(express.json());
app.use(routes);

//GET
app.get("/pages/client", (request, response) => {
    return response.render("html/client.html");
});
app.get("/pages/admin", (request, response) => {
    return response.render("html/admin.html");
});
//POST
// app.post("/", (request, response) => {
//     return response.json({ message: "User saved success" })
// })
//PUT
//DELETE
//PATCH - Alteração específica 

export { httpServer, io }
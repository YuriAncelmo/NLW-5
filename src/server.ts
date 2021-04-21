import express from "express";
import './database' //Não precisa colocar o index por que com a raiz já reconhece
import { routes } from "./routes";

const app = express();
app.use(express.json());
app.use(routes);
//GET
app.get("/", (request, response) => {
    return response.json({ message: "Hello NLW 05" });
});
//POST
app.post("/", (request, response) => {
    return response.json({ message: "User saved success" })
})
//PUT
//DELETE
//PATCH - Alteração específica 
app.listen(3333, () => console.log("Run on port 3333..."));
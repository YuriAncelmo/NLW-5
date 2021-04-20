import express from "express";

const app = express();
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
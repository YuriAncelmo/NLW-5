import { httpServer } from "./http"
import "./websocket/client"

httpServer.listen(3333, () => console.log("Run on port 3333..."));
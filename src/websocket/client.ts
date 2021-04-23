import { io } from "../http"
import { ConnectionService } from "../services/ConnectionsService";
import { MessageServices } from "../services/MessagesService";
import { UserService } from "../services/UserService";
interface IParams {
    text: string;
    email: string;
}
io.on("connect", (socket) => {
    const connectionsService = new ConnectionService();
    const userServices = new UserService();
    const messageServices = new MessageServices();
    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;

        console.log(params);
        //A função de criar verifica se existe e se não já cria
        const user = await userServices.create(email);
        const user_id = user.id;
        await connectionsService.create({
            socket_id,
            user_id
        });
        await messageServices.create({
            text,
            user_id
        });
        //Salva conexão com socketid e user id
    })
});
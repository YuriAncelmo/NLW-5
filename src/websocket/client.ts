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
        const allMessages = await messageServices.listByUser(user_id);
        socket.emit("client_list_all_messages", allMessages);
    })
    //Recebe a mensagem que veio da página e emite
    socket.on("client_send_to_admin", async (params) => {

        const { text, socket_admin_id } = params;
        const socket_id = socket.id;
        const { user_id } = await connectionsService.findBySocketID(socket_id);

        const message = await messageServices.create({
            text,
            user_id
        })

        const allUsers = await connectionsService.findAllWithoutAdmin();
        //Ainda não dá pois há um bug que só possui o id do socket do admin, quando ele envia uma mensagem de volta
        io.to(socket_admin_id).emit("admin_list_all_users", allUsers)
        console.log("client_send_to_admin");

        //Manda via IO para o socket do admin, para o evento admin receive message
        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id
        });
    });
});

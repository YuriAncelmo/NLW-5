import { io } from "../http";
import { ConnectionService } from "../services/ConnectionsService";
import { MessageServices } from "../services/MessagesService";

io.on("connect", async (socket) => {
    const connectionsService = new ConnectionService();
    const messageService = new MessageServices();

    const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();
    io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    socket.on("admin_list_messages_by_user", async (params, callback) => {
        const { user_id } = params;
        const allMessages = await messageService.listByUser(user_id);
        callback(allMessages);
    })
    //Quando o administrador manda mensagem para o cliente
    socket.on("admin_send_message", async (params) => {
        const { user_id, text } = params;
        //Cria a mensagem no bd
        await messageService.create({
            text,
            user_id,
            admin_id: socket.id
        })
        //Pega o socket do usuario
        const { socket_id } = await connectionsService.findByUserID(user_id);
        //Manda o evento para o chat.js
        io.to(socket_id).emit("admin_send_to_client", {
            text,
            socket_id: socket.id
        });
    })
    socket.on("admin_in_support", async params => {
        const { user_id } = params;
        await connectionsService.updateAdminID(user_id, socket.id);
        const allConnectionsWithoutAdmin = await connectionsService.findAllWithoutAdmin();
        io.emit("admin_list_all_users", allConnectionsWithoutAdmin);
    })

})
let socket_admin_id = null;
let emailUser = null;
let socket = null;

document.querySelector("#start_chat").addEventListener("click", (event) => {
    socket = io();

    const chat_help = document.getElementById("chat_help");
    chat_help.style.display = "none";

    const btn_support = document.getElementById("btn_support");
    btn_support.style.display = "none";

    const chat_in_support = document.getElementById("chat_in_support");
    chat_in_support.style.display = "block";

    const email = document.getElementById("email").value;
    emailUser = email;

    const text = document.getElementById("txt_help").value;

    socket.on("connect", () => {
        const params = {
            email,
            text,
        };
        socket.emit("client_first_access", params, (call, err) => {
            if (err) {
                console.err(err);
            } else {
                console.log(call);
            }
        });
    });

    socket.on("client_list_all_messages", (messages) => {
        var template_client = document.getElementById("message-user-template")
            .innerHTML;
        var template_admin = document.getElementById("admin-template").innerHTML;

        messages.forEach((message) => {
            if (message.admin_id === null) {
                const rendered = Mustache.render(template_client, {
                    message: message.text,
                    email,
                });

                document.getElementById("messages").innerHTML += rendered;
            } else {
                const rendered = Mustache.render(template_admin, {
                    message_admin: message.text,
                });

                document.getElementById("messages").innerHTML += rendered;
            }
        });
    });

    socket.on("admin_send_to_client", (message) => {
        //Atribui o socket do admin ao socket da mensagem
        socket_admin_id = message.socket_id;

        const template_admin = document.getElementById("admin-template").innerHTML;

        const rendered = Mustache.render(template_admin, {
            message_admin: message.text,
        });

        document.getElementById("messages").innerHTML += rendered;
    });
});

document
    .querySelector("#send_message_button")
    .addEventListener("click", (event) => {
        const text = document.getElementById("message_user");

        const params = {
            text: text.value,
            socket_admin_id,
        };

        //Manda para o socket client, por que a pagina que está conectada é a do client
        socket.emit("client_send_to_admin", params);

        const template_client = document.getElementById("message-user-template")
            .innerHTML;

        const rendered = Mustache.render(template_client, {
            message: text.value,
            email: emailUser,
        });

        document.getElementById("messages").innerHTML += rendered;
    });

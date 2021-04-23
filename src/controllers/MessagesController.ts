import { Response, Request } from 'express';
import { MessageServices } from '../services/MessagesService';
class MessagesController {
    async create(request: Request, response: Response) {
        const messageService = new MessageServices();
        const { admin_id, text, user_id
        } = request.body;
        const message = await messageService.create({
            admin_id,
            text,
            user_id
        });
        return response.json(message);
    }
    async showByUser(request: Request, response: Response) {
        const { id } = request.params;
        const messageService = new MessageServices();
        const list = await messageService.listByUser(id);
        return response.json(list);

    }
}

export { MessagesController }
import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';

interface IMessageCreate {
    admin_id?: string,
    text: string,
    user_id: string

}

class MessageServices {
    private messagesRepository: Repository<Message>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }
    async create({ admin_id, text, user_id }: IMessageCreate) {
        // const messagesRepository = getCustomRepository(MessagesRepository);
        const message = this.messagesRepository.create({

            admin_id,
            text,
            user_id

        });
        await this.messagesRepository.save(message);
        return message;
    }
    async listByUser(user_id: string) {
        const messages = await this.messagesRepository.find({
            where: { user_id },
            relations: ["user"]//Preenche os valores do usuário que é FK
        })
        return messages
    }
}

export { MessageServices }
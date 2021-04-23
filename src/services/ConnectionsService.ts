import { Repository } from 'typeorm';
import { getCustomRepository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRepository } from "../repositories/ConnectionsRepository"

interface IConnectionCreate {
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}
class ConnectionService {
    private connectionsRepository: Repository<Connection>
    constructor() {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
    async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {

        const connectionsExists = await this.findByUserID(user_id);
        //Se existir atualiza o socket e retorna o existente
        if (connectionsExists) {
            connectionsExists.socket_id = socket_id;
            this.connectionsRepository.save(connectionsExists);
            return connectionsExists;
        }

        const connection = this.connectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id
        });

        await this.connectionsRepository.save(connection);

        return connection;
    }
    async findByUserID(user_id: string) {
        const connection = await this.connectionsRepository.findOne({ user_id })
        if (connection)
            return connection;
    }
}

export { ConnectionService }
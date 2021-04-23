import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"

class UserService {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = getCustomRepository(UsersRepository);
    }
    async create(email: string) {

        const user = await this.userRepository.findOne({ email })
        if (user) {
            return user;
        }

        const createdUser = this.userRepository.create({ email });

        await this.userRepository.save(createdUser);
        return createdUser;

    }

}

export { UserService }
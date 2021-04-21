import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

class UserService {
    async create(email: string) {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne({ email })
        if (user) {
            return user;
        }

        const createdUser = userRepository.create({ email });

        await userRepository.save(createdUser);
        return createdUser;

    }
}

export { UserService }
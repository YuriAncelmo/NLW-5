import { Entity, PrimaryColumn, CreateDateColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @JoinColumn({ name: "user_id" })
    @ManyToOne(() => User)//Muitas mensagens para um usuário
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: string;
    constructor() {
        this.id = !this.id ? uuid() : this.id;
    }
}
export { Message }
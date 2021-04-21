import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { updateFunctionDeclaration } from "typescript";

export class CreateSettings1618967687443 implements MigrationInterface {

    //When execute run 
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "settings",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "username",
                    type: "varchar"
                },
                {
                    name: "chat",
                    type: "boolean",
                    default: true
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));
    }
    //When execute revert
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("settings");
    }

}

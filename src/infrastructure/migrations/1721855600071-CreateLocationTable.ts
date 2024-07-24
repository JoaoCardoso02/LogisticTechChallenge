import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLocationTable1721855600071 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'contact_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'contact_phone',
                        type: 'varchar',
                        isNullable: false
                    },
                ],
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location')
    }

}

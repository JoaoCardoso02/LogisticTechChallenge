import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateOrderTable1721861214107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'order',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'weight',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'origin_id',
                        type: 'UUID',
                        isNullable: false
                    },
                    {
                        name: 'destination_id', 
                        type: 'UUID',
                        isNullable: false
                    },
                ],
            }),
            true
        )

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['origin_id'],
                referencedTableName: 'location',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        )

        await queryRunner.createForeignKey(
            'order',
            new TableForeignKey({
                columnNames: ['destination_id'],
                referencedTableName: 'location',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('order')
    }

}

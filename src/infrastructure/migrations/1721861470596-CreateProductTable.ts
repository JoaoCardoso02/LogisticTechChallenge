import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductTable1721861470596 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'product',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                        default: 'gen_random_uuid()'
                    },
                    {
                        name: 'order_id',
                        type: 'UUID',
                        isNullable: false
                    },
                    {
                        name: 'length',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'width',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'height',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'weight',
                        type: 'int',
                        isNullable: false
                    },
                ],
            }),
            true
        )

        await queryRunner.createForeignKey(
            'product',
            new TableForeignKey({
                columnNames: ['order_id'],
                referencedTableName: 'order',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('product')
    }

}

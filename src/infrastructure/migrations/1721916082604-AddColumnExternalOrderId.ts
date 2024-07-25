import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnExternalOrderId1721916082604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'order',
            new TableColumn({
                name: 'external_id',
                type: 'uuid',
                isUnique: true,
                isNullable: true
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('order', 'external_id')
    }

}

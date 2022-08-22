import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEstablishment1661121147766 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "establishment",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "cnpj",
            type: "varchar",
            length: "14",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "EstablishmentUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("establishment");
  }
}

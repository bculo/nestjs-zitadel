import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1715685974226 implements MigrationInterface {
    name = 'Initial1715685974226'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_item_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "todoListId" uuid NOT NULL, CONSTRAINT "PK_abf610d3d128dd3e1f985582715" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "todo_list_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "random" character varying, CONSTRAINT "PK_fc676b8d150d2f08255fd0d5df1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question_categories_category" ("questionId" integer NOT NULL, "categoryId" integer NOT NULL, CONSTRAINT "PK_11044aadb95ef30daf7d1363d31" PRIMARY KEY ("questionId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_21433e6d9a0e7e79c36b4ae69f" ON "question_categories_category" ("questionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cf04f10454634f887ade56562" ON "question_categories_category" ("categoryId") `);
        await queryRunner.query(`ALTER TABLE "todo_item_entity" ADD CONSTRAINT "FK_5bab18c0b700c975129f99cc413" FOREIGN KEY ("todoListId") REFERENCES "todo_list_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" ADD CONSTRAINT "FK_9cf04f10454634f887ade565622" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_9cf04f10454634f887ade565622"`);
        await queryRunner.query(`ALTER TABLE "question_categories_category" DROP CONSTRAINT "FK_21433e6d9a0e7e79c36b4ae69fd"`);
        await queryRunner.query(`ALTER TABLE "todo_item_entity" DROP CONSTRAINT "FK_5bab18c0b700c975129f99cc413"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9cf04f10454634f887ade56562"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_21433e6d9a0e7e79c36b4ae69f"`);
        await queryRunner.query(`DROP TABLE "question_categories_category"`);
        await queryRunner.query(`DROP TABLE "todo_list_entity"`);
        await queryRunner.query(`DROP TABLE "todo_item_entity"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}

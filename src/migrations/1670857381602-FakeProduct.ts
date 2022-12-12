import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeProduct1670857381602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table product (
        title VARCHAR(50),
        description TEXT,
        price INT,
        quantity INT,
        picture VARCHAR(50),
        orderId VARCHAR(1)
    );
    insert into product (title, description, price, quantity, picture, orderId) values ('Overhold', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.
    
    In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 1, 1, 'http://dummyimage.com/110x100.png/dddddd/000000', 1);
    insert into product (title, description, price, quantity, picture, orderId) values ('Fintone', 'Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.
    
    In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.
    
    Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.', 2, 2, 'http://dummyimage.com/125x100.png/5fa2dd/ffffff', 1);
    insert into product (title, description, price, quantity, picture, orderId) values ('Voltsillam', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 3, 3, 'http://dummyimage.com/238x100.png/ff4444/ffffff', 1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}

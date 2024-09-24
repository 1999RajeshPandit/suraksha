import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsString, IsNotEmpty } from "class-validator";

@Entity("customer")
export class Customer {
  @PrimaryGeneratedColumn({ name: "id"})
  id: number;

  @Column({ name: "name", type: "varchar", length: 50, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: "productid", type: "integer", nullable: true })
  productId: number;

  @Column({ name: "discount", type: "integer", nullable: true })
  discount: number;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsString, IsNotEmpty } from "class-validator";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn({ name: "id"})
  id: number;

  @Column({ name: "name", type: "varchar", length: 50, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: "baseprice", type: "integer", nullable: false })
  @IsString()
  @IsNotEmpty()
  basePrice: number;
}
 
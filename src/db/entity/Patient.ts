import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {IsString, IsNotEmpty } from "class-validator";

@Entity("patient")
export class Patient {
  @PrimaryGeneratedColumn({ name: "id"})
  id: number;

  @Column({ name: "name", type: "varchar", length: 50, nullable: false })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: "phonenumber", type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ name: "customerid", type: "integer", nullable: true })
  customerid: string;
}

import { Exclude, Type } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";

import { User } from "../../users/entities/User";

@Entity("client")
class Client {
  @Exclude()
  @PrimaryColumn()
  id: string;

  @Column({ length: 11 })
  cpf: string;

  @Column("time with time zone")
  birth_date: Date;

  @OneToOne(() => User, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  @Type(() => User)
  user: User;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;
}

export { Client };

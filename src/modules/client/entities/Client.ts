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
  @PrimaryColumn()
  id: string;

  @Column({ length: 11 })
  cpf: string;

  @Column("time with time zone")
  birth_date: Date;

  @OneToOne(() => User)
  @JoinColumn({ name: "id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export { Client };

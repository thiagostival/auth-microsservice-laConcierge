import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { User } from "../../users/entities/User";

@Entity("establishment")
class Establishment {
  @Exclude()
  @PrimaryColumn()
  id: string;

  @Column({ length: 14 })
  cnpj: string;

  @Column()
  max_capacity: number;

  @Column()
  busy_capacity: number;

  @OneToOne(() => User, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: "id", referencedColumnName: "id" })
  user: User;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;
}

export { Establishment };

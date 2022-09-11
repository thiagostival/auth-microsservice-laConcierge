import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  name: string;

  @Column()
  tel: string;

  @Column()
  is_establishment: boolean;

  @Column()
  is_admin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null;
    }
    return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };

import { User } from "@/shared/domain/entities/user";
export interface UsersRepository {
  create(data: User): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUserByDocument(cpf: string): Promise<User | null>;
  update(id: string, data: Omit<User, "id">): Promise<User | null>;
  delete(id: string): Promise<void>;
}

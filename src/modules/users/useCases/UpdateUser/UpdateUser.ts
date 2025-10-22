import type { PrismaClient } from "@prisma/client";

interface UpdateUserRequest {
}

interface UpdateUserResponse {
}

export class UpdateUser {
  constructor(private readonly prisma: PrismaClient) {}

  async execute(data:UpdateUserRequest): Promise<UpdateUserResponse> {
    
  }
}
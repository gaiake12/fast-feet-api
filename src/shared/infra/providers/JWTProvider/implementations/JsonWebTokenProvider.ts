import jwt from "jsonwebtoken";
import type { JWTProvider, TokenPayload } from "../models/JWTProvider";

export class JsonWebTokenProvider implements JWTProvider {
  constructor(private readonly secretKey: string) {}

  async sign(payload: TokenPayload): Promise<string> {
    return jwt.sign(payload, this.secretKey);
  }

  async verify(token: string): Promise<TokenPayload> {
    return jwt.verify(token, this.secretKey) as TokenPayload;
  }
}

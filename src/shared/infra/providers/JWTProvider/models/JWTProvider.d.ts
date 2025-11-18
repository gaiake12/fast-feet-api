export type TokenPayload = {
  sub: string;
  exp: number;
  iat: number;
};

export interface JWTProvider {
  sign(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
}

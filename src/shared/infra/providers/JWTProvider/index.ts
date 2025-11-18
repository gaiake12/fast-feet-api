import { JsonWebTokenProvider } from "./implementations/JsonWebTokenProvider";
import { env } from "../../env";

export const jwtProvider = new JsonWebTokenProvider(env.JWT_SECRET_KEY);

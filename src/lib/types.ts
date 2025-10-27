import { DefaultSession } from "next-auth";

export interface LocationData {
  latitude: number;
  longitude: number;
  timestamp: string;
}

export interface LocationHistoryEntry extends LocationData {
  status: "success" | "failed";
  responseMessage?: string;
}

declare module "next-auth" {
    interface Session {
      accessToken?: string;
      refreshToken?: string;
      instanceUrl?: string;
      user?: {
        id?: string;
      } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
      accessToken?: string;
      refreshToken?: string;
      instanceUrl?: string;
      user?: {
        id?: string | null;
      } & DefaultSession["user"];
    }
}

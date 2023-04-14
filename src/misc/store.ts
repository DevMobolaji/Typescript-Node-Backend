
import { redis } from "./redis"
import Store from "@/utils/interfaces/store.interface";
import RedisStore from "connect-redis"
import { redisSessionPrefix } from "./constants";

const store: Store = {
    store: new (RedisStore as any)({
        client: redis,
        prefix: redisSessionPrefix
    }),
    name: process.env.SESSION_NAME as Store["name"],
    secret: process.env.SESSION_SECRET as Store["secret"],
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        //secure: sanitizedConfig.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        sameSite: "none"
    }
}

export default store
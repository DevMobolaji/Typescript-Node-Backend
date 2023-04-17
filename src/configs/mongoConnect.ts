require('dotenv').config();
import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URL = process.env.MONGO_PATH as string

mongoose.connection.once("open", () => {
    console.log("MongDB connection ready!");
});

mongoose.connection.on("error", (err: any) => {
    console.error(err);
});

mongoose.set('strictQuery', false);

export async function mongoConnect() {
    await mongoose.connect(MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
}


async function mongoDisconnect(): Promise<void> {
    await mongoose.disconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect
}


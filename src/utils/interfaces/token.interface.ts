import { Schema } from "mongoose"

interface Token extends Object {
    id: Schema.Types.ObjectId,
    expiresIn: Number,
}

export default Token
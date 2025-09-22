import { Schema } from "mongoose";

const billCountSchema = new Schema({
  fyear: { type: String, required: true, unique: true },
  count: { type: Number, required: true, default: 0 }
})

export default billCountSchema;
import { Schema } from "mongoose";

const traderSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['buyer', 'vendor'], index: true },
  gstin: { type: String },
  contact: { type: String, required: true },
  address: { type: String },
  placeOfSupply: { type: String },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true })

export default traderSchema;
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  hsn: { type: String, required: true, index: true },
  mfgDate: { type: Date, default: null },
  expDate: { type: Date, default: null },
  quantity: { type: Number, required: true, min: 1 },
  originalQuantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default productSchema;
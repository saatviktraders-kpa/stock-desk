import { Schema } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  hsn: { type: String, required: true },
  brand: { type: String, required: true },
  mrp: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

const lotSchema = new Schema({
  pid: { type: Schema.Types.ObjectId, required: true, index: true },
  purchaseDate: { type: Date, default: new Date(), required: true },
  mfgDate: { type: Date, default: null },
  expDate: { type: Date, default: null },
  quantity: { type: Number, required: true, min: 1 },
  originalQuantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
  lotType: { type: String, enum: ['normal', 'return'], default: 'normal' }
}, { timestamps: true })

export { productSchema, lotSchema };
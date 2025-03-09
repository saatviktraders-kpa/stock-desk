import { Schema } from "mongoose";

export const saleLotSchema = new Schema({
  saleId: { type: Schema.Types.ObjectId, required: true, ref: 'sale' },
  lid: { type: Schema.Types.ObjectId, required: true, ref: 'lot' },
  quantity: { type: Number, required: true, min: 1 }
})

export const saleSchema = new Schema({
  billId: { type: Schema.Types.ObjectId, required: true, ref: 'bill', unique: true },
  billDate: { type: Date, required: true },
  sale: [{
    _id: false,
    pid: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    quantity: { type: Number, required: true },
    net: { type: Number, required: true },
    cost: { type: Number, required: true },
  }],
  // Payment Information
  payment: {
    _id: false,
    received: { type: Number, default: 0 }
  }
}, { timestamps: true })
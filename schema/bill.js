import { Schema } from "mongoose";

const billSchema = new Schema({
  billNo: { type: String, required: true, unique: true },
  buyer: {
    _id: false,
    name: { type: String, required: true },
    gst: { type: String, required: true },
    contact: { type: String },
    address: { type: String },
    placeOfSupply: { type: String, required: true },
  },
  products: [{
    _id: false,
    uid: { type: String, required: true },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    discount: { type: Number, required: true },
    cgst: { type: Number, required: true, default: 9 },
    sgst: { type: Number, required: true, default: 9 },
  }],
  state: { type: String, enum: ['draft', 'completed'], default: 'draft' }
}, { timestamps: true });

export default billSchema;
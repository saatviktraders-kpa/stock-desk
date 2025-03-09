import { Schema } from "mongoose";

const Buyer = {
  _id: false,
  name: { type: String, required: true },
  gstin: { type: String },
  contact: { type: String, required: true },
  address: { type: String },
  placeOfSupply: { type: String },
}

const billSchema = new Schema({
  billNo: { type: String, required: true, unique: true },
  billDate: { type: Date, required: true, default: new Date() },
  state: { type: String, enum: ['draft', 'delivered', 'completed'], default: 'draft', index: true },

  // Buyer Information (either buyerid or buyer)
  buyerId: { type: Schema.Types.ObjectId, index: true, ref: 'trader' },
  buyer: { type: Buyer, default: null, required: function () { return !Boolean(this.buyerId) } },

  // Order Information
  order: [{
    _id: false,
    pid: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true }, // gst-included
    discount: { type: Number, required: true },
    cgst: { type: Number, required: true, default: 9 },
    sgst: { type: Number, required: true, default: 9 },
  }],
}, { timestamps: true });

export default billSchema;
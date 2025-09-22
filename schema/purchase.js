import { Schema } from "mongoose"

const Vendor = {
  _id: false,
  name: { type: String, required: true },
  gstin: { type: String },
  contact: { type: String, required: true },
  address: { type: String },
}

const purchaseSchema = new Schema({
  purchaseDate: { type: Date, required: true, default: new Date() },
  state: { type: String, enum: ['draft', 'completed'], default: 'draft' },
  total: { type: Number, required: true, default: 0 },

  vendorId: { type: Schema.Types.ObjectId, index: true, ref: 'trader' },
  vendor: { type: Vendor, default: null, required: function () { return !Boolean(this.vendorId) } },

  // Purchase Information
  purchase: [{
    _id: false,
    pid: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // net-cost of each product
    mfgDate: { type: Date, default: null },
    expDate: { type: Date, default: null }
  }],
}, { timestamps: true })

export default purchaseSchema
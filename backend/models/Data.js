import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["fallen_leaves", "wood", "medicinal_plants"],
      required: true,
    },
    entityName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    amount: {
      type: Number, // Changed to Number for numerical operations
      required: true,
      min: 0, // Ensure amount is non-negative
    },
    pricePerAmount: {
      type: Number, // Changed to Number for numerical operations
      required: true,
      min: 0, // Ensure price is non-negative
    },
    deliveryDays: {
      type: Number, // Changed to Number for numerical operations
      required: true,
      min: 1, // Ensure at least 1 day
    },
    aadharNumber: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v); // Ensure exactly 12 digits
        },
        message: (props) => `${props.value} is not a valid Aadhar number!`,
      },
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
dataSchema.index({ aadharNumber: 1 });
dataSchema.index({ entityName: 1 });

const Data = mongoose.model("Data", dataSchema);
export default Data;

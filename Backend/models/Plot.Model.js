import mongoose from "mongoose";
const { Schema } = mongoose;

const PlotSchema = new Schema({
  plotName: {
    type: String,
    required: [true, "Plot name is required"],
  },

  location: {
    type: String,
    required: [true, "Location is required"],
  },

  farmerId: {
    type: Schema.Types.ObjectId,
    ref: "Farmer",
    required: true,
  },

  area: {
    type: Number,
    required: [true, "Area is required"],
  },

  soilType: {
    type: String,
    default: "Unknown",
  },

  irrigationType: {
    type: String,
    default: "Unknown",
  },

  cropName: {
    type: String,
  },

  plantationDate: {
    type: Date,
    required: [true, "Plantation date is required"],
  },

}, {
  timestamps: true,
});

const Plot = mongoose.model("Plot", PlotSchema);

export default Plot;

import Plot from "../../models/Plot.Model.js";
import Farmer from "../../models/Farmer.Model.js";

export const addPlot = async (req, res) => {
  try {
    const farmerId = req.user.id; 
    const { plotName, location, area, soilType, irrigationType, cropName, plantationDate } = req.body;

    if (!plotName || !location || !area||!plantationDate) {
      return res.status(400).json({
        success: false,
        message: "Plot name, location, plantation date and area are required.",
      });
    }

    const farmer = await Farmer.findById(farmerId);

    if (!farmer) {
      return res.status(404).json({ success: false, message: "Farmer not found." });
    }

    const newPlot = new Plot({
      plotName,
      location,
      farmerId,
      area,
      soilType,
      irrigationType,
      cropName,
      plantationDate,
    });

    await newPlot.save();

    farmer.plots.push(newPlot._id);
    await farmer.save();

    res.status(201).json({
      success: true,
      message: "Plot added successfully.",
      plot: newPlot,
    });

  } catch (error) {
    console.error("Error adding plot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

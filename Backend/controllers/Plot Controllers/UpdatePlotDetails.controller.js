import Plot from "../../models/Plot.Model.js";
import Farmer from "../../models/Farmer.Model.js";

export const updatePlotDetails = async (req, res) => {
  try {
    const farmerId = req.user.id;
    const { plotId } = req.params;
    const { plotName, location, area, soilType, irrigationType, cropName, plantationDate } = req.body;

    
    const plot = await Plot.findOne({ _id: plotId, farmerId });
    if (!plot) {
      return res.status(404).json({
        success: false,
        message: "Plot not found or not associated with this farmer.",
      });
    }

    // Update allowed fields
    if (plotName) plot.plotName = plotName;
    if (location) plot.location = location;
    if (area) plot.area = area;
    if (soilType) plot.soilType = soilType;
    if (irrigationType) plot.irrigationType = irrigationType;
    if (cropName) plot.cropName = cropName;
    if (plantationDate) plot.plantationDate = plantationDate;

    await plot.save();

    res.status(200).json({
      success: true,
      message: "Plot details updated successfully.",
      plot,
    });

  } catch (error) {
    console.error("Error updating plot:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

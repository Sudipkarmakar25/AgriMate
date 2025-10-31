import Plot from "../../models/Plot.Model.js";

export const getAllPlotDetails = async (req, res) => {
    try {
        const farmerId = req.user.id;
        const plots = await Plot.find({ farmerId }).populate(); 
        res.status(200).json({ success: true, message: "Plot details fetched successfully.", plots }); 
    } catch (error) {
        console.error("Error fetching plot details:", error);
        res.status(500).json({ success: false, message: "Error fetching plot details." });
    }
};
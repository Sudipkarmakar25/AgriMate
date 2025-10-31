import Plot from "../../models/Plot.Model.js";

export const deletePlot = async (req, res) => {
    try {
        const { plotId } = req.params;
        const plot = await Plot.findByIdAndDelete(plotId);
        if (!plot) {
            return res.status(404).json({ success: false, message: "Plot not found." });
        }
        res.status(200).json({ success: true, message: "Plot deleted successfully." });
    } catch (error) {
        console.error("Error deleting plot:", error);
        res.status(500).json({ success: false, message: "Error deleting plot." });
    }
}
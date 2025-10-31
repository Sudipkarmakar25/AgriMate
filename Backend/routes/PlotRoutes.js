import {Router} from "express"

import { authMiddleware } from "../middlewares/authMiddleware.js"

import { addPlot } from "../controllers/Plot Controllers/AddPlot.Controller.js"
import {getAllPlotDetails} from "../controllers/Plot Controllers/GetAllthePlotDetailsofaFarmer.Controller.js"
import {updatePlotDetails} from "../controllers/Plot Controllers/UpdatePlotDetails.controller.js"
import {deletePlot} from "../controllers/Plot Controllers/DeletePlot.Controller.js"

const PlotRouter=Router()

PlotRouter.post("/addPlot", authMiddleware, addPlot);
PlotRouter.put("/updatePlot/:plotId", authMiddleware, updatePlotDetails);
PlotRouter.get("/getAllPlots", authMiddleware, getAllPlotDetails);
PlotRouter.delete("/deleteplot/:plotId", authMiddleware, deletePlot);
export default PlotRouter
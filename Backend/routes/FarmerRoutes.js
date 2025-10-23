import {Router} from "express"
import  registerFarmer from "../controllers/FarmerController/FarmerRegister.Controller.js"
import loginFarmer from "../controllers/FarmerController/FarmerLogin.Controller.js"
import logoutFarmer from "../controllers/FarmerController/FarmerLogout.Controller.js"
import isFarmerLoggedIn from "../controllers/FarmerController/IsFarmerLoggedIn.Controller.js"

const Farmerrouter=Router()

Farmerrouter.route("/register").post(registerFarmer)
Farmerrouter.route("/login").post(loginFarmer)
Farmerrouter.route("/logout").post(logoutFarmer)
Farmerrouter.route("/isFarmerloggedIn").get(isFarmerLoggedIn)

export default Farmerrouter
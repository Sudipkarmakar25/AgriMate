import Farmer from "../../models/Farmer.Model.js";

const loginFarmer = async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    if (!phonenumber || !password) {
      return res
        .status(400)
        .json({success:false, error: "Phone number and password are required" });
    }
    const farmer = await Farmer.findOne({ phonenumber });
    if (!farmer) {
      return res.status(400).json({success:false, error: "User not found" });
    }
    const isPasswordCorrect = await farmer.isPassWordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({success:false, error: "Invalid password" });
    }
    const token = farmer.generateAccessToken();

    const loginFarmer = await Farmer.findById(farmer._id).select("-password");
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Farmer logged in successfully",
      farmer: loginFarmer,
      AccessToken: token,
      success:true
    });
  } catch (error) {
    res.status(400).json({success:false, error: error.message });
  }
};

export default loginFarmer;

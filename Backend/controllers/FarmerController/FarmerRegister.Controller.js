import Farmer from "../../models/Farmer.Model.js";


const registerFarmer=async(req,res)=>{
    try {
        const { name, phonenumber, email, password, address } = req.body;
        if(!name || !phonenumber || !password || !address){
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existedUser= await Farmer.findOne({ phonenumber });
        if(existedUser){
            return res.status(400).json({ error: 'User already exists' });
        }
        // const hashedPassword = await bcrypt.hash(password, 10);
        const farmer = await Farmer.create({
          name,
          phonenumber,
          email,
          password: password,
          address,
        });

        const createdFarmer = await Farmer.findById(farmer._id).select('-password');
        if(!createdFarmer){
            return res.status(400).json({ error: 'Error in creating Farmer Details' });
        }
        res.status(201).json({
          message: 'Farmer registered successfully',
          farmer: createdFarmer,
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export default registerFarmer;
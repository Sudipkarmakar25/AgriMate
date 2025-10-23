import jwt from 'jsonwebtoken';
import Farmer from '../../models/Farmer.Model.js'; 


const isFarmerLoggedIn = async (req, res) => {
    try {
        const token = req.cookies.accessToken;
        
        if (!token) {
            return res.status(401).json({ 
                isLoggedIn: false, 
                message: 'Unauthorized: No token provided' 
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 

        const user = await Farmer.findById(decoded.id).select('-password');
        
        if (!user) {
            return res.status(401).json({ 
                isLoggedIn: false, 
                message: 'Unauthorized: User no longer exists' 
            });
        }

        return res.status(200).json({
            isLoggedIn: true,
            message: 'Farmer is currently logged in',
            user: {
                _id: user._id,
                name: user.name,
                phonenumber: user.phonenumber,
                email: user.email 
            }
        });

    } catch (error) {
        
        console.error('Login Status Check Error:', error.message);
        return res.status(401).json({ 
            isLoggedIn: false,
            message: 'Unauthorized: Session is expired or invalid.' 
        });
    }
};

export default isFarmerLoggedIn;
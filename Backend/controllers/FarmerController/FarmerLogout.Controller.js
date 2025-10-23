const logoutFarmer = async (req, res) => {
    try {
       
        res.cookie("accessToken", "", {
            httpOnly: true,
            secure: true, 
            sameSite: 'none', 
            expires: new Date(0), 
            
        });

        res.status(200).json({ 
            message: "Logout successful" 
        });
        
    } catch (error) {
        
        console.error("Logout Error:", error.message);
        res.status(500).json({ 
            error: "An error occurred during logout." 
        });
    }
};

export default logoutFarmer;
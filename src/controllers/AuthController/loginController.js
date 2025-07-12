const errorHandler = require("../../middleware/errorHandler");
const successHandler = require("../../middleware/successHandler");
const UserModel = require("../../models/UserModel");
const bcrypt = require("bcrypt");

const loginController =async (req,res) =>{
    
    try{
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const verifyUser=await bcrypt.compare(password, user.password);
        let userData 
        if (verifyUser) {
            userData = {
                name: user.name,
                email: user.email
            };
        }
        
        res.send(
            successHandler({
                status: 200,
                data: verifyUser ? userData : null,
                message: verifyUser ? 'Login successful' : 'Invalid credentials',
            })
        );
    }catch(error){
        res.send(errorHandler({
            status: 500,
            message: 'Error during login: ' + error.message,
        }))
    }
}

module.exports ={ loginController};
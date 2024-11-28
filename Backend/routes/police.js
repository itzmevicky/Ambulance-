const router = require('express').Router() ;
const user = require('../models/user') ;

//getting the driver data
router.get('/get-user-data',async (req,res) => {
    try {
        const users = await user.find().sort({createdAt:-1}) ;
        res.status(200).json({message:"User Fetched Successfully",data:users}) ;
    } catch (error) {
        res.status(500).json({message : "User Not Fetched"}) ;
        console.log(error) ;
    }
});

//add the message
router.put('/add-police-message',async (req,res) => {
    try {
        const message = req.body.message ;
        const {id} = req.headers ;

        const updatedUser = await user.findByIdAndUpdate(
            id,
            {
                message:message,
            },
            {new:true}
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        return res.status(200).json({ message: 'Police Message Added successfully', updatedUser });

    } catch (error) {
        res.status(500).json({message : "Police Message Not Added"}) ;
        console.log(error) ;
    }
});

module.exports = router ;
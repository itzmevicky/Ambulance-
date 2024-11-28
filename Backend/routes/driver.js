const router = require('express').Router() ;
const user = require('../models/user') ;

//adding the driver data
router.post('/add-user-data',async (req,res) => {
    try {
        const newUser = new user({
            license_no : req.body.license_no ,
            type_of_vehicle : req.body.type_of_vehicle ,
            vechicle_no : req.body.vechicle_no ,
            source : req.body.source ,
            destination : req.body.destination
        }) ;

        const savedVehicle = await newUser.save() ;

        res.status(200).json({
            _id: savedVehicle._id,
            message: 'User Created Successfully',
          });
    } catch (error) {
        res.status(500).json({message : "User Not Created"}) ;
        console.log(error) ;
    }
});

//get the driver message
router.get('/get-driver-message/:id',async (req,res) => {
    try {
        const {id} = req.params ;
        const driver = await user.findById(id) ;
        res.status(200).json({message:"Driver Message Received",data:driver})
    } catch (error) {
        res.status(500).json({message : "Driver message Not Found"}) ;
        console.log(error) ;
    }
});

module.exports = router ;
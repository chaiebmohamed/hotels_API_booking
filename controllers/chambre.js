const Room = require('../models/chambre');

exports.addRoom = async (req, res) => {

    const room = new Room({
        id: req.body.id,
        price: req.body.price,
        type: req.body.type,
        numberofperson: req.body.nbp
    })

    try {

        const savedRoom = await room.save();
        res.send(room);


    }
    catch (error) {
        res.status(400).send(error);    
    }

}

exports.changeStatus = async (req , res) => {

   
    try {
        const room = await Room.findOneAndUpdate({id : req.body.id , isAvailable : true} , {isAvailable : false})
        return res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error);
        
    }
    
}
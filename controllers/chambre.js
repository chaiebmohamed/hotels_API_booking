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
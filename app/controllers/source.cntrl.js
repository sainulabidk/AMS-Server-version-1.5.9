const modeModel = require('../model/source.model');

// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.description && !req.body.status && !req.body.createdAt && !req.body.updatedAt&& !req.body.createdBy && !req.body.updatedBy) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const source = new modeModel({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        createdAt:req.body.createdAt,
        updatedAt:req.body.updatedAt,
        createdBy:req.body.createdBy,
        updatedBy:req.body.updatedBy
    
    });
    await source.save().then(data => {
       
        res.send({
            message:"User created successfully!!",
            source:data
        });
    }).catch(err => {
        
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });
};

exports.findAll = async (req, res) => {
    try {
        const source = await modeModel.find().sort({ createdAt : 1,_id:-1});
        res.status(200).json(source);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

exports.findOne = async (req, res) => {
    try {
        const source = await modeModel.findById(req.params.id);
        res.status(200).json(source);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be Empty!"
        });
    }
    
    const id = req.params.id;
    
    await modeModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await modeModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.send({
            message: "User deleted successfully!"
          });
        }
    }).catch(err => {
        res.status(500).send({
          message: err.message
        });
    });
};

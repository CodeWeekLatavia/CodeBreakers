const Proffessions = require("../models/proffessionModel");

const proffessionCtrl = {
    new: async (req, res) => {
        try {
            const { name, tags, skills } = req.body;

            const newTheme = new Proffessions({
                name,
                tags,
                skills
            });

            await newTheme.save();

            res.json({msg: "Created a new theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    get: async (req, res) => {
        try {
            const proffessions = await Proffessions.find();

            res.json(proffessions);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.params;

            const { name, tags, skills } = req.body;

            await Proffessions.findByIdAndUpdate({_id: id}, {
                name, tags, skills
            });

            res.json({msg: "Updated a theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params;

            await Proffessions.findByIdAndDelete({_id: id});

            res.json({msg: "Deleted a theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = proffessionCtrl;
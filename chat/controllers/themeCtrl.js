const Themes = require("../models/themeModel");

const themeCtrl = {
    new: async (req, res) => {
        try {
            const { name, type, info } = req.body;

            const newTheme = new Themes({
                name,
                type,
                info
            });

            await newTheme.save();

            res.json({msg: "Created a new theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    get: async (req, res) => {
        try {
            const themes = await Themes.find();

            res.json(themes);
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    update: async (req, res) => {
        try {
            const {id} = req.params;

            const { name, type, info } = req.body;

            await Themes.findByIdAndUpdate({_id: id}, {
                name, type, info
            });

            res.json({msg: "Updated a theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params;

            await Themes.findByIdAndDelete({_id: id});

            res.json({msg: "Deleted a theme"});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
};

module.exports = themeCtrl;
const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// schema des données => colonnes
const schemaParametres = mongoose.Schema({
    information : String
});
// lier le schéma à la collection = Modèle
const Parametres = mongoose.model("parametres", schemaParametres);

const schema = joi.object({
    information : joi.string().min(3).max(500).required(),
});

module.exports.schema = schema;
module.exports.Parametres = Parametres;
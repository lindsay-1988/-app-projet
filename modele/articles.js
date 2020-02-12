const mongoose = require("mongoose");
const joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
// schema des données => colonnes
const schemaArticles = mongoose.Schema({
    titre : String,
    contenu : String,
    dateCreation : {type : Date, default : Date.now},
    nomAuteur : String,
    categories: String,
    email : String,
    estPublie: Boolean
});
// lier le schéma à la collection = Modèle
const Articles = mongoose.model("articles", schemaArticles);

const schema = joi.object({
    titre : joi.string().min(3).max(255).required(),
    contenu : joi.string().min(3).max(1000).required(),
    nomAuteur : joi.string().min(0).max(120).required(),
    categories: joi.string().min(3).max(255).required(),
    email : joi.string().email().required(),
    estPublie: joi.boolean().required()
});

module.exports.schema = schema;
module.exports.Articles = Articles;
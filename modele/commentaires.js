const mongoose = require("mongoose");
const joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

// schema des données => colonnes
const schemaCommentaires = mongoose.Schema({
    contenu : String,
    dateCreation : {type : Date, default : Date.now},
    nomAuteur : String,
});
// lier le schéma à la collection = Modèle
const Commentaires = mongoose.model("commentaire", schemaCommentaires);

const schema = joi.object({
    contenu : joi.string().min(3).max(1000).required(),
    nomAuteur : joi.string().min(3).max(255).required(),
});

module.exports.schema = schema;
module.exports.Commentaires = Commentaires;
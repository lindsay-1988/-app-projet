const mongoose = require("mongoose");
const joi = require("@hapi/joi").extend(require("@hapi/joi-date"));

// schema des données => colonnes
const schemaCommentaires = mongoose.Schema({
    contenu : String,
    dateCreation : Date,
    nomAuteur : String,
});
// lier le schéma à la collection = Modèle
const Commentaires = mongoose.model("commentaire", schemaCommentaires);

const schema = joi.object({
    contenu : joi.string().min(3).max(1000).required(),
    dateCreation : joi.date().format('YYYY-MM-DD').required(),
    nomAuteur : joi.number().min(3).max(255).required(),
});

module.exports.schema = schema;
module.exports.Commentaires = Commentaires;
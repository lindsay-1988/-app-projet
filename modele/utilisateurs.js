const mongoose = require("mongoose");
const joi = require("@hapi/joi");

// schema des données => colonnes
const schemaUtilisateurs = mongoose.Schema({
    prénom : String,
    nom : String,
    role : String,
    password: String,
    email : String,
    estActif: Boolean
});
// lier le schéma à la collection = Modèle
const Utilisateurs = mongoose.model("utilisateurs", schemaUtilisateurs);

const schema = joi.object({
    titre : joi.string().min(3).max(255).required(),
    contenu : joi.string().min(3).max(255).required(),
    datereation : joi.boolean().required(),
    email : joi.string().email().required(),
    estActif: joi.boolean().required()
});

module.exports.schema = schema;
module.exports.Utilisateurs = Utilisateurs;
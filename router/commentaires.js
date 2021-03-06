const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

// schema des données => colonnes
const {Commentaires, schema} = require("../modele/commentaires");

router.post("/", async function(req, res){
    // récupérer le body de la requête post
    const body = req.body;

    // vérifier qu'elle est conforme à ce que l'on attend
    const verif = schema.validate(body);

    // si ko => message et stop execution
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }

    // si ok => ajouter dans ka base de données Mongo un nouvel enregistrement
    const commentaires = new Commentaires(body);
    const resultat = await commentaires.save(); 
    res.send(resultat);
});

// récupérer tous les profils
router.get("/", async function(req,res){
    const resultat = await Commentaires.find() 
    res.send(resultat);
});

// récupérer un seul commentaires
router.get("/:id", async function(req,res){
    const id = req.params.id;
    const verifID = mongoose.Types.ObjectId.isValid(id);

    // si l'id n'est pas conforme => 400 bad request et stop
    if(!verifID){
        res.status(400).send("id donné n'est pas conforme");
        return;
    }
    
    // vérifier qu'il y a bien un commentaires avec l'id recherché
    const resultat = await Commentaires.find({_id : id});
    res.send(resultat);
   
    // si il n'y a pas de commentaires => 404 not found et stop
    if(resultat.length === 0){
        res.status(404).send("aucun enregistrement avec l'id " + id);
    }

    // si tout est ok je retourne le commentaires concerné
    res.send(resultat);
})

// supprimer un enregistrement dans la base de données Mongo DB online
router.delete("/:id", async function(req,res){
    // récupérer l'id
    const id = req.params.id;

    // vérifier que l'id est conforme
    // verifID = true || false
    const verifID = mongoose.Types.ObjectId.isValid(id);

    // si non conforme => erreur 400 + stop  + message
    if(!verifID){
        res.status(400).send("l'id transmis n'est pas conforme");
        return;
    };

    // vérifier s'il existe bien un enregistrement avec id transmis dans l'url
    const resultat = await Commentaires.deleteOne({_id : id});
    // res.send(resultat);

    // s'il y en a pas => erreur 404 + stop + message
    if(resultat.deletedCount === 0){
    res.status(404).send("il n'existe pas d'enregistrement avec l'id " + id);
    };
    // si tout est ok => effectuer la suppression
    // retourner un message la liste les profils dans la base
    const reponse = await Commentaires.find();
    res.send(reponse);
});

// Mise à jour d'un enregistrement dans la bdd MongoDB
router.put("/:id", async function(req, res){
    // réupérer l'id
    const id = req.params.id;

    // vérifier que l'id est conforme
    const verifID = mongoose.Types.ObjectId.isValid(id);

    // si c'est conforme : erreur 400 + message + stop
    if(!verifID){
        res.status(400).send("id non conforme !");
        return;
    }

    // récupérer le body de la requête
    const body = req.body;

    // vérifier quelle est conforme
    const verif = schema.validate(body);

    // si non conforme : erreur 400 + message + stop
    if(verif.error){
        res.status(400).send(verif.error.details[0].message);
        return;
    }
    // est qu'il y a un enregistrement avec l'id transmis dans l'url
    const resultat = await Commentaires.findById(id);

    // s'il n'y a pas d'enregistrement : erreur 404 + message + stop
    if(!resultat){
        res.status(404).send("aucun enregistrement trouvé pour l'id " + id);
        return;
    };
    // si tout ok alors effectuer la mise à jour
    // retourner la liste des profils
    resultat.contenu = body.contenu;
    resultat.dateCreation = body.dateCreation;
    resultat.nomAuteur = body.nomAuteur;
  
    const reponse = await resultat.save();
    res.send(reponse);
});


module.exports = router;
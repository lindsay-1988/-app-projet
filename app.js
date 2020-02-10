const express = require("express");
const mongoose = require("mongoose");
const routerArticles = require("./router/articles");
const routerUtilisateurs = require("./router/utilisateurs");
const routerCommentaires = require("./router/commentaires");
const routerParametres = require("./router/parametres");



// spécial pour le fait que l'on va mettre en ligne notre projet
const cors = require("cors");

const app = express();

// fonction middleware
app.use(cors()); // autoriser des site internet à lui faire des requêtes
app.use(express.json()); // récupérer plus facile le body des requêtes POST et PUT

app.use("/articles", routerArticles); 
app.use("/utilisateurs", routerUtilisateurs); 
app.use("/commentaires", routerCommentaires); 
app.use("/parametres", routerParametres); 


const urlBdd = "mongodb+srv://ifocop_admin:azerty1234@cluster0-gomac.mongodb.net/test?retryWrites=true&w=majority"; // https://mlab.com =>se connecter avec le compte que l'on a créé
const optionConnexion = {
    useNewUrlParser : true,
    useUnifiedTopology : true
};

mongoose.connect(urlBdd, optionConnexion)
        .then(function(){
            console.log("connexion à la base de donnée est réussi");
        })
        .catch(function(err){
            console.log(err);
        });


// spéciale pour la mise en ligne de notre projet
// || => opérateur boolean ou &&
// process.env.PORT == récupérer le port d'écoute de la machine
// sur l'ordinateur process.env.PORT == undefined
// 
const port = process.env.PORT || 2000;
//                  undefined ||2000
//                  2000
// wikipédia port et protocole
// https://fr.wikipedia.org/wiki/Liste_de_ports_logiciels

app.listen(port, function(){
    console.log("serveur lancé sur le port " + port);
});
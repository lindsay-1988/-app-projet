gitconst express = require("express");
const mongoose = require("mongoose");
const routerArticles = require("./router/articles");
const routerUtilisateurs = require("./router/utilisateurs");
const routerCommentaires = require("./router/commentaires");
const routerParametres = require("./router/parametres");

const cors = require("cors");

const app = express();

// fonction middleware
app.use(cors()); 
app.use(express.json()); 

app.use("/articles", routerArticles); 
app.use("/utilisateurs", routerUtilisateurs); 
app.use("/commentaires", routerCommentaires); 
app.use("/parametres", routerParametres); 


const urlBdd = "mongodb+srv://ifocop_admin:azerty1234@cluster0-gomac.mongodb.net/test?retryWrites=true&w=majority"; 
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


const port = process.env.PORT || 2000;

app.listen(port, function(){
    console.log("serveur lancé sur le port " + port);
});

// https://quiet-gorge-56637.herokuapp.com
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentaire = new Schema({
  nom: String,
  image: String,
  contenu : String,
  date: String

});

var forum = new Schema({
  sujet: String,
  nom_cons: String,
  img: String,
  Description: String,
  date: String,
  commentaire: [commentaire],
});




module.exports = mongoose.model("commentaire", commentaire);
module.exports = mongoose.model("forum", forum);

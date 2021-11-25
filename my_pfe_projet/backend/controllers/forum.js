const forum = require('../models/Forum');
const commentaire = require('../models/Forum');

exports.addForum = (req, res) => {
  
    const Forum = new forum();
      Forum.sujet = req.body.sujet,
      Forum.nom_cons= req.body.nom_cons,
      Forum.img = req.body.img,
      Forum.Description = req.body.Description,
      Forum.date = req.body.date,
      Forum
        .save((error) => {
          if (error) {
            console.log(error);
            res.status(500).json({ message: error });
          }
          else {

        res.json({
          msg: ' added',
        });
      }
    });
  };


  exports.getForumById = (req, res) => {
   
    forum.findOne({_id :req.body._id})
     .then((data) => {
       res.json(data);
     })
     .catch((err) => {
       console.log(err);
     });
  };
  
  
  exports.updateForum = async ( req, res ) => {
    forum.updateOne(
        { _id: req.body._id },
        {
          sujet : req.body.sujet,
          Description : req.body.Description,

        }
     )
     .then(() => {
       res.status(200).json({
         message: ' Updated!',
       });
     })
     .catch((error) => {
       res.status(400).json({
         error: error,
       });
     });
  };
  


  exports.updateComment = async ( req, res ) => {
    forum.update(
      { 'commentaire._id': req.body._id },
      {'$set': {'commentaire.$.contenu': req.body.contenu}}
   ) 
   .then(() => {
     res.status(200).json({
       message: ' Updated!',
     })
   })
   .catch((error) => {
     res.status(400).json({
       error: error,
     });
   });
}

exports.deleteCom = async ( req, res ) => {


forum.update( 
  { _id: req.body._id },  {
      $pull: {
        commentaire: { _id : req.body._idC }
      }
  }
) .then(() => {
  res.status(200).json({
    message: ' Updated!',
  })
})
.catch((error) => {
  res.status(400).json({
    error: error,
  });
});
}

   
exports.getForum = (req, res) => {
    forum.find()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log(err);
      });
  };



  exports.addComment =(req, res) => {
 

    forum.findById(req.body._id)
    .then((forum) => {
        if (forum != null) {
       
          forum.commentaire.push({
            date : req.body.date ,
            contenu : req.body.contenu,
            image : req.body.image ,
            nom : req.body.nom
          });
          forum.save()
            .then((forum) => {
                res.json("updated");
            })
        }
        else {
          res.json("error");
        } 
    })
      .catch(err => {
        console.log(err);
      });
}

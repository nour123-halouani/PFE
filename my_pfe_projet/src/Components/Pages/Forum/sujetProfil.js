import { Button,  TextField , Container, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import { Box,  Divider,  Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EditIcon from "@material-ui/icons/Edit";
import Popupeditedit from './sujetedit'
import { Form, Formik , Field, ErrorMessage } from 'formik';
import Swal from 'sweetalert2';
import  * as yup from "yup";
import DeleteIcon from "@material-ui/icons/Delete";
import PopupEditComm from "./PopupCommet"

const useStyles = makeStyles(theme => ({
    paper: {
      width: "98%",
      height: "fit-content",
      backgroundColor: "rgba(248, 250, 178, 0.59)",
      marginLeft: "1%",
      marginTop: "1%",
    },
    typography: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(6),
      },
    image:{
      width: "50%",
      height: "30%",
      paddingBottom: "4%"
      },
    edit:{
        right:"130%",
        bottom:"-22%", 
      },
      contain:{
        backgroundColor: "rgba(F, F, F, F)",

      },      
    image: {
        width: '50px',
        height: '50px',
        borderRadius :"100%",
        border: "3px solid #FFC92F",
  },
    sujet: {
    marginLeft:"80px",
    marginRight:"80px"

    }
}))

const validationSchema = yup.object().shape({
    contenu: yup
      .string()
      .required("champs obligatoire!"),   
      

  });


  
export default function Forum(props){
 
  const user = JSON.parse(localStorage.getItem('user'));
  const initialValues = {
    contenu : "",
};

const handleSubmit = (values , {resetForm} ) => {
    axios({
      url: "http://localhost:4000/api/forum/addComment",
      method: "post",
      data: {
          _id : forumData._id,
    date: new Date().toLocaleDateString(),
    contenu : values.contenu,
    image : user.img,
    nom : user.Nom_prénom
    },
    })
      .then(res => {
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Bien ajouté",
          html: '<span style="color:#FFFFFF"> </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 500); 
     
       
      })
      .catch(err => {
        Swal.fire({
          icon: "warning",
          html: '<span style="color:#FFF6C5"> </span>',
          showCloseButton: false,
          showConfirmButton: false,
          background: "black",
          timer: 2000,
        });
      });
  };


  const [openPopupedit , setOpenPopupedit]=useState(false);
  const [openPopupComm , setOpenPopupComm] = useState (false)
  const [com , setCom]=useState({})



const [forumData , setForumData]=useState({
    _id:"",
    sujet:"",
    img:"",
    Description:"",
    nom_cons:"",
    commentaire :[]
});


  useEffect(() => {
    const getForum = async () => {
      await 
         axios({
        url: 'http://localhost:4000/api/Forum/getForumById',
        method: 'post',
        data: {
         _id: props.match.params.id
        },
      }).then((res)=>{
        setForumData(res.data)
      })
    };

    getForum();  
   },[ props.match.params.id]); //UNE SEUL FOIS 



  //**************************************************************************** */


 

    const classes = useStyles();


  return (
    <Paper elevation={6} className={classes.paper}>
        <Typography  variant="h4" className={classes.typography}>
          <strong>{forumData.sujet} </strong> <br/>
        </Typography>

    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />

<Paper elevation={6} className={classes.sujet}><br/> 

<Box display="flex">
<Box  flexGrow={1}>

<span style={{paddingLeft:"20px" , marginRight:"6px"}}><img className={classes.image} src={forumData.img}/> </span>
 <em> <span style={{verticalAlign :"20px" , fontSize:"20px"}}>{forumData.nom_cons}</span> </em> 
   </Box>





 { user !== null &&( user.Nom_prénom === forumData.nom_cons || user.Role === "Admin" ) ?

                           <Box>         
                                <IconButton
                               style={{ marginBottom:"50px" , color:"#FFC92F" , marginRight:"30px"}}
                                size="small"
                                color="primary"
                                onClick={() => {
                                   setOpenPopupedit(true);
                                  
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                              </Box>
:""}
  </Box>
<p style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}}>{forumData.Description}</p>
<p style={{textAlign :"right" , marginRight :"40px"}}> {forumData.date}</p>


<br/><br/>

</Paper>
<br/><br/>

{forumData.commentaire.map((post)=>{
    return (
        <Container>
        <span style={{paddingLeft:"20px" , marginRight:"6px"}}><img className={classes.image} src={post.image}/> </span>
 <em> <span style={{verticalAlign :"20px" , fontSize:"20px"}}> {post.nom}</span> </em> 


                    <Box display="flex">
                      <Box flexGrow={1}>
                      <p style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}}>{post.contenu}</p>

                      </Box>
                          <Box >
                          { user !== null && ( user.Nom_prénom === post.nom || user.Role === "Admin" )  ?

                          <IconButton
                               style={{ marginBottom:"50px" , color:"#000"}}
                                size="small"
                                color="primary"
                                onClick={() => {
                                  setOpenPopupComm(true);
                                  setCom(post)

                                  
                                }}
                              >
                                <EditIcon style={{ color:"#FFC92F"}} />
                                <DeleteIcon style={{ color:"#000"}}/>
                              </IconButton>
                              :""}
                          </Box>
                          </Box>
          {/* <p style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}}>{post.contenu}</p> */}
           <p style={{textAlign :"right" , marginRight :"40px"}}> {post.date}</p>




           <Divider style={{ marginBottom: "20px", marginLeft:"20px" , marginRight:"20px"}} />
        <br/>
 </Container>
           
    );
})}



{ user !== null && (user.Role === "Etudiant" || user.Role === "Conseiller") ?
  <div style={{marginLeft :"25%"}}>
 <Formik
          enableReinitialize={true}
          validateOnBlur={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form noValidate autoComplete="off">
              <center>
                <Field
             
                  multiline
                  rows="8"
                  style={{ width: "600px" }}
                  as={TextField}
                  name="contenu"
                  variant="outlined"
                  className={classes.textField}
                  label="Ajouter commentaire"
                  size="small"
                  helperText={<ErrorMessage name="contenu" />}
                  error={errors.contenu && touched.contenu}
                />
                <br />
                <br />
                <div>
                  <Button
                    className={classes.soumettre}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                  >
                    Envoyer
                  </Button>
                </div>
              </center>
            </Form>
          )}
        </Formik>
        <br/><br/>
        </div>
: ""}
          <Popupeditedit
            data={forumData}
            openPopupedit={openPopupedit}
            setOpenPopupedit={setOpenPopupedit}
          ></Popupeditedit>

          <PopupEditComm
          idSujet={props.match.params.id}
           data={com}
           openPopupComm={openPopupComm}
           setOpenPopupComm={setOpenPopupComm}
         ></PopupEditComm>
  </Paper>
  )
};
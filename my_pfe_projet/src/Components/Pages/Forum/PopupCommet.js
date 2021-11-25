import React, { useEffect, useRef, useState } from 'react'
import { Dialog,  DialogContent, makeStyles, Button, ButtonBase } from '@material-ui/core';
import {useFormik} from 'formik'
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import  * as yup from "yup";
import axios from 'axios';
import Swal from 'sweetalert2';


const useStyles = makeStyles(theme => ({

    customizedButton: {
        position: 'absolute',
        left: '90%',
        top: '3%',
        backgroundColor: '',
        color: 'gray',
      },
    }))
      
      const validationSchema = yup.object().shape({
        contenu: yup
          .string()
          .required("champs obligatoire!"),       
    
      });

  
export default function PopupEdit ( { openPopupComm, setOpenPopupComm , data ,idSujet } ) {

 


    
    const classes = useStyles();

    const formik = useFormik({
        
      initialValues: {
        _id: data._id,
        contenu: data.contenu,

        },

        validationSdchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        enableReinitialize: true,  // Contrôlez si Formik doit réinitialiser le formulaire en cas de initialValueschangement

        onSubmit: values => {
          console.log("dddd");
           if (  values.contenu === data.contenu

            ) {

            setOpenPopupComm(false); 
            Swal.fire({
              icon: "warning",
              title: "Pas de modifications",
              html: '<span style="color:#FFFFFF">  </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          }  
          else{
          axios({
            url: 'http://localhost:4000/api/Forum/updateComment',
            method: 'put',
            data: values,
          })

          .then((res)=>{
            setOpenPopupComm(false)
               Swal.fire({
                icon: "success",
                title: "Modifié avec succès",
                html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 1000,
            })   
            setTimeout(() => {
              window.location.reload();
             }, 1000); 
               
           })
  
         .catch((err)=> {
          setOpenPopupComm(false)
          Swal.fire({
              icon:'warning',
              html : '<span style="color:#FFF6C5"> Erreur </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
          });
        } 
    },
  });

        
    return (
        <Dialog open={openPopupComm} maxWidth="md" >
            <DialogContent style={{width:"500px"}}>
                <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopupComm(false)}}>
                    <CloseIcon />
                </IconButton>
                <br/>
                <form onSubmit={formik.handleSubmit} >
                    <div className="filières">
                        <label htmlFor="contenu"
                      >contenu
                         </label>
                        <textarea
                        name="contenu"   
                        style={{height: '200px'}}
                        value={formik.values.contenu
}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.contenu
                        && formik.errors.contenu
                        ? formik.errors.contenu
                        : ""}
                                            </span>
                    </div>

                    <div className="createAccount">
                        <Button type="submit" style ={{backgroundColor:"#FFC92F" }} disabled={!formik.isValid}> Modifier</Button>
                      
                   </div>
          </form>
         <center style ={{marginBottom:"12px" }}>Ou supprimer le commentaire</center>
          <Button fullWidth style ={{backgroundColor:"rgba(0, 0, 0, 0.80)" , height:"45px" , color:"white"}} 
          onClick={()=>{
            axios({
              url: 'http://localhost:4000/api/Forum/deleteCom',
              method: 'put',
              data: { _id: idSujet , _idC: data._id },
            }).then(()=> {
              setOpenPopupComm(false); 
              window.location.reload();

            })
          }}
          >Supprimer</Button> 

            </DialogContent>
        </Dialog>
    )
}

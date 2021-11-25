import React, { useEffect, useRef, useState } from 'react'
import { Dialog,  DialogContent, makeStyles, Button } from '@material-ui/core';
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
        sujet: yup
          .string()
          .required("champs obligatoire!"),   
        Description: yup
          .string()
          .required("champs obligatoire!"),       
    
      });

  
export default function PopupAddSujet (props) {


  const user = JSON.parse(localStorage.getItem('user'));
  const { openPopup, setOpenPopup } = props;

    
    const classes = useStyles();

      const formik = useFormik({
        initialValues: {
          nom_cons:"",
          sujet: "",
          Description:"",
          img:"",
          date: ""
          },
          validationSchema: validationSchema,
          validateOnBlur: true,
          
          onSubmit: values => {
            axios({
              url: 'http://localhost:4000/api/forum/addForum',
              method: 'post',
              data: {
                Description : values.Description,
                sujet:values.sujet,
                img: user.img,
                nom_cons: user.Nom_prénom,
                date: new Date().toLocaleDateString()
              },
            })
            .then((res)=>{
                formik.resetForm()
                setOpenPopup(false)
                 Swal.fire({
                icon:'success',
                title: "Bien ajouté",
                html : '<span style="color:#FFFFFF"> </span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 2000,
              })                        
               setTimeout(() => {
                window.location.reload();
               }, 2000); 
            })
    
           .catch((err)=> {
            setOpenPopup(false)

            Swal.fire({
                icon:'warning',
                html : '<span style="color:#FFF6C5"> Erreur produit</span>',
                showCloseButton: false,
                showConfirmButton: false,
                background: "black",
                timer: 3500,
      
              })
      
           })
      
          }
    });


        
    return (
        <Dialog open={openPopup} maxWidth="md" >
            <DialogContent >
                <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopup(false)}}>
                    <CloseIcon />
                </IconButton>
                <h1>Ajouter un sujet</h1>
                <br/>
                <br/>
                <form onSubmit={formik.handleSubmit} >


                    <div className="filières">
                        <label htmlFor="sujet">Sujet </label>
                        <input
                        placeholder="sujet"
                        type="text"
                        name="sujet"
                        value={formik.values.sujet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.sujet && formik.errors.sujet ? formik.errors.sujet: ""}
                    </span>
                    </div>


                    <div className="filières">
                        <label htmlFor="Description">Description </label>
                        <textarea
                        name="Description"
                        style={{height: '200px'}}
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.Description && formik.errors.Description ? formik.errors.Description: ""}
                    </span>
                    </div>

                    <div className="createAccount">
                      <button type="submit" disabled={!formik.isValid}>Créer le sujet</button>
                   </div>
          </form>
         
            </DialogContent>
        </Dialog>
    )
}

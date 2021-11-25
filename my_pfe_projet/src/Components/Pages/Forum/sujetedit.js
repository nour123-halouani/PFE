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
        left: '89%',
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

  
export default function Popupeditedit (props) {

    const { openPopupedit, setOpenPopupedit , data } = props;
   
    
    const classes = useStyles();

    


      const formik = useFormik({
        initialValues: {
          _id:data._id,
          sujet: data.sujet,
          Description:data.Description
          },
          validationSchema: validationSchema,
          validateOnBlur: true,
          validateOnChange: true,
          enableReinitialize: true,

          onSubmit: values => {
            if (
              values.sujet === data.sujet && 
              values.Description === data.Description) {

          setOpenPopupedit(false); 
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
            url: 'http://localhost:4000/api/Forum/updateForum',
            method: 'put',
            data: {
              _id:data._id,
              sujet : values.sujet,
              Description : values.Description,

            },
          })

          .then((res)=>{
            setOpenPopupedit(false)
             Swal.fire({
              icon: "success",
              title: "Modifié avec succès",
              html: '<span style="color:#FFFFFF">Les champs sont bien modifiés. </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 2000,
          })     
          setTimeout(() => {
            window.location.reload();
          }, 1000);         
         })

         .catch((err)=> {
          setOpenPopupedit (false)
          Swal.fire({
              icon:'warning',
              html : '<span style="color:#FFF6C5"> Erreur </span>',
              showCloseButton: false,
              showConfirmButton: false,
              background: "black",
              timer: 3500,
            });
        }  )



          
        }
    }})
          
  
        
    return (
        <Dialog open={openPopupedit} maxWidth="md" >
            <DialogContent >
                <IconButton className={classes.customizedButton}
                onClick={()=>{setOpenPopupedit(false)}}>
                    <CloseIcon />
                </IconButton>
                <h1>Modifier un sujet</h1>
                <br/>
                <br/>
                <form onSubmit={formik.handleSubmit} >
                    <div className="filières">
                        <label htmlFor="sujet">sujet</label>
                        <input 
                        placeholder="sujet"
                        type="text"
                        name="sujet"
                        value={formik.values.sujet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.sujet && formik.errors.sujet? formik.errors.sujet : ""}
                    </span>
                    </div>
                     <br/>

                    <div className="filières">
                        <label htmlFor="Description">Description </label>
                        <textarea
                        name="Description"
                        style={ {height: '200px'}}
                        value={formik.values.Description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    <span className="errorMessage">
                        {formik.touched.Description && formik.errors.Description ? formik.errors.Description: ""}
                    </span>
                    </div>

                    <div className="createAccount">
                      <button type="submit" disabled={!formik.isValid}>Modifier</button>
                   </div>

          </form>
         
            </DialogContent>
        </Dialog>
    )
      }

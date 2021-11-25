
import React from 'react';
import { Button, Container, Grid, IconButton, InputAdornment, makeStyles, Paper , TextField} from '@material-ui/core';
import { Box,  Divider,  Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from "@material-ui/icons/Search";
import PopupAddSujet from "./popupAddSujet"


const useStyles = makeStyles(theme => ({
  paper: {
    width: "98%",
    height: "fit-content",
    backgroundColor: "rgba(248, 250, 178, 0.59)",
    marginLeft: "1%",
    marginTop: "1%",
  },
  box: {
    width: "70px",
    height: "55px",
    marginRight: theme.spacing(2),
    border:" 3px solid #FFC92F",
    borderRadius:"10px",
    backgroundColor:"#FFC92F",
    color:"#00000",
    minWidth:"70px"
  },
  ajout: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(85),
    marginBottom: theme.spacing(2),
  },
}))

export default function ListeForum() {

    const user = JSON.parse(localStorage.getItem('user'));
    const [dataForum , setForumData]=useState([]);
    const [searchForum, setSearchForum] = useState("");
    const [searchDatasForum, setSearchDataForum] = useState(dataForum);
    const [openPopup, setOpenPopup] = useState(false);

    const classes = useStyles();

useEffect(() => {
  const getData = async () => {
    await axios({
      url: 'http://localhost:4000/api/Forum/getForum',
      method: 'get',
     
    }).then((res)=>{

      setSearchDataForum(res.data.reverse()); 
        setForumData(res.data)
    })
  };

  getData();  
}, []); //UNE SEUL FOIS 



useEffect(() => {
  if (searchForum === "") {
    setSearchDataForum(dataForum);
  } else {
    setSearchDataForum(
        dataForum.filter(val => {
        return val.sujet.toLowerCase().includes(searchForum.toLowerCase());
      })
    );
  }
}, [searchForum, dataForum]);

const handleClick= () => {
//   Swal.fire(
//     {
//       showCloseButton: false,
//       showConfirmButton: false,
//       icon:'warning',
//       background: "black",
//       title: "Vous voulez connecter d'abord",
//       timer: 3500,
//      })
}




    return (


    <Paper elevation={6} className={classes.paper}>
        <br /><br />
        <Typography  variant="h3" className={classes.typography}>
         <center><em> Forum de discussion  </em></center> 
        </Typography>
    <br />
    <Divider style={{ marginBottom: "20px", marginLeft:"60px" , marginRight:"60px"}} />
    <br />


    <Container style={{ marginBottom: "50px" }}>
          <Paper elevation={6}>
            <br />
            <br />

            <TextField
            style={{marginLeft:"70px" , width:"250px" , marginBottom:"20px"}}
              onChange={e => {
                const timerId = setTimeout(() => {
                  setSearchForum(e.target.value);
                }, 500);

                return () => {
                  clearTimeout(timerId);
                };
              }}
              placeholder="chercher sujet"
              variant="standard"
              size="small"
              className={classes.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
        {user !== null && (user.Role ==="Etudiant" || user.Role ==="Conseiller") ?  
          

              <Button
                variant="contained"
                color="primary"
                className={classes.ajout}
                onClick={() => {
                  setOpenPopup(true);
                }}
              >
               <i class="fas fa-comments"></i>&ensp; Ajouter un sujet
              </Button>
              :(
                  ""
              )
             }
             <br />
            <br />

            {user !== null && user.Role ==="Admin" ?
            (
              <div style={{ paddingLeft: "20px", paddingBottom: "30px" , maxHeight :"250px" , overflow :"auto"}} >
              {searchDatasForum.map((forum, index) => {
               
                return (
                  <Container key={index} >
                    <Box display="flex">
                      <Box alignSelf="center" className={classes.box}>
                       <center> {forum.commentaire.length} <br/><em> Réponses </em></center>
                      </Box>
                      <Box flexGrow={1}>
                        <Box display="flex">
                          <Box flexGrow={1}>
                            <Typography variant="h6" color="primary">
                              <em> {forum.sujet}</em>  
                            </Typography>
                            <Typography variant="body2" color="secondary">
                            <em style={{color:"#000"}}>Proposé par: </em>{forum.nom_cons} 
                            </Typography>
                          </Box>
                          <Box>
                            <Typography align="right" >
                              {/* <br/><br/><br/><br/> */}
                              <Button size="small" color="secondary">
                                   <Link
                                 style={{ color:"#FFC92F"}}
                      
                                to={{
                                  pathname: `/Forum/${forum._id}`,
                                 
                                }}
                              >
                             Voir plus
                              </Link>
                              </Button>                           
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="subtitle2" style={{ width:"92%"}}>
                          {forum.Description}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ overflow: "hidden"  }}
                        >
                        </Typography>
                      </Box>
                    </Box>

                    <Divider
                      style={{ marginTop: "5px", marginBottom: "5px" }}
                    />
                  </Container>
                );
              })} 
            </div>
            ) :
            (
              
            <div style={{ paddingLeft: "20px", paddingBottom: "30px" }} >
            {searchDatasForum.map((forum, index) => {
             
              return (
                <Container key={index}  >
                  <Box display="flex">
                    <Box alignSelf="center" className={classes.box}>
                     <center> {forum.commentaire.length} <br/><em> Réponses </em></center>
                    </Box>
                    <Box flexGrow={1}>
                      <Box display="flex">
                        <Box flexGrow={1}>
                          <Typography variant="h6" color="primary">
                            <em> {forum.sujet}</em>  
                          </Typography>
                          <Typography variant="body2" color="secondary">
                          <em style={{color:"#000"}}>Proposé par: </em>{forum.nom_cons} 
                          </Typography>
                        </Box>
                        <Box>
                          <Typography align="right" >
                            {/* <br/><br/><br/><br/> */}
                            <Button size="small" color="secondary">
                                 <Link
                               style={{ color:"#FFC92F"}}
                    
                              to={{
                                pathname: `/Forum/${forum._id}`,
                               
                              }}
                            >
                           Voir plus
                            </Link>
                            </Button>                           
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="subtitle2" style={{ width:"92%"}}>
                        {forum.Description}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ overflow: "hidden"  }}
                      >
                      </Typography>
                    </Box>
                  </Box>

                  <Divider
                    style={{ marginTop: "5px", marginBottom: "5px" }}
                  />
                </Container>
              );
            })} 
          </div>

            )

            }


          </Paper>
          <br/>
          <br/>
        </Container>
        <PopupAddSujet 
            openPopup={openPopup} 
            setOpenPopup={setOpenPopup}
    ></PopupAddSujet>
       
        </Paper>

    )

};
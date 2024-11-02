import "./TodaysPicture.css"
import { useEffect, useState } from "react";
import { NasaPicture } from "../../routes/NasaPicture";

import axios from "axios";
import { Loader } from "../Loader/Loader";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box } from "@mui/material";

const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N";

export interface ITodaysPictureProps {
}

export function TodaysPicture (props: ITodaysPictureProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [url, setUrl] = useState("")
  const [title, setTitle] = useState("")
  const [info, setInfo] = useState("")
  const [disabled, setDisabled] = useState("")
  const getTodayData = async () => {
  
    try {

      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${url}`);
      
      const data = response.data;
      setUrl(data.hdurl)
      setTitle(data.title)
      setInfo(data.explanation)
      
    } catch (error) {
      console.log(error);
    }
  
  };
  useEffect(() => {
    const fetchData = async () => {
      setDisabled("");
      await getTodayData();
      setTimeout(() => { setDisabled("disabled") }, 2500);
    };
    fetchData();
  }, [url]);
  return (
    <>
      <section className="myForm-today">
        <p className="today-p">Esta é a imagem de hoje:</p> 
        <h1>{title}</h1>
          <div className="container-form">
            
            <div className="container-img">
              
              <NasaPicture imageUrl={url}/>
              
              <div className="container-buttons"> 
                <Button className="info-btn" onClick={handleOpen}>
                  <InfoRoundedIcon className="info"/>
                </Button>
                <a download target="_blank" href={url} className="info-btn">
                  <Button className="info-btn">
                    <VisibilityIcon className="hd"/>
                  </Button>
                </a>   
                              
              </div>
              
              <Modal
              className="modal" 
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <h1>{title}</h1>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 {info}
                </Typography>
              </Box>
            </Modal>
            </div>
            

            
          </div>  
          
          <Loader disabled={disabled} />
      </section>
        
      </>
  );
}

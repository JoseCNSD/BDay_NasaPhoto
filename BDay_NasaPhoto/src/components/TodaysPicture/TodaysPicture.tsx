import "./TodaysPicture.css"
import { useEffect, useState } from "react";
import { NasaPicture } from "../../routes/NasaPicture";

import axios from "axios";
import { Loader } from "../Loader/Loader";
import { Box, Modal, Typography } from "@mui/material";

import Button from '@mui/material/Button';
import HdIcon from '@mui/icons-material/Hd';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';


const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N";


export interface ITodaysPictureProps {
}

export function TodaysPicture (props: ITodaysPictureProps) {
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
      setInfo(data.info)
      
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
      <section className="my-today-section">
        <h1>{title}</h1>
        <div className="container-img">
          
          <NasaPicture imageUrl={url}/>
        </div>
            
      </section>
              
              



      <Loader disabled={disabled} />
      
    </>
  );
}

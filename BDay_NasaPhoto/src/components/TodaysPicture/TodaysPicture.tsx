import "./TodaysPicture.css"
import { useEffect, useState } from "react";
import { NasaPicture } from "../../routes/NasaPicture";

import axios from "axios";

const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N";


export interface ITodaysPictureProps {
}

export function TodaysPicture (props: ITodaysPictureProps) {
  const [url, setUrl] = useState("")
  const getTodayData = async () => {
  
    try {

      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${url}`);
      
      const data = response.data;
      setUrl(data.hdurl)
      
    } catch (error) {
      console.log(error);
    }
  
  };
  useEffect(() => {
    
    getTodayData();
  }, []);
  return (
    <>
      <NasaPicture imageUrl={url}/>
    </>
  );
}

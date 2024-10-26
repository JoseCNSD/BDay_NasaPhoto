import { NasaPicture } from "../routes/NasaPicture"
import { useEffect, useState } from "react";
import "./NasaForm.css"
import axios from "axios";


export interface INasaFormProps {
}
export function NasaForm (props: INasaFormProps) {
  const [url, setUrl] = useState("")
  const [imgUrl, setImgUrl] = useState("https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg")
  const [info, setInfo] = useState("")
  const [title, setTitle] = useState("")
  const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N"
  const getData = async ()=>{
    try {
      
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}${url}`)
      const data = response.data
      setImgUrl(data.hdurl)
      setTitle(data.title)
      setInfo(data.explanation)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
    }
    useEffect(()=>{
      getData()
    })


  return (
    
      <form action="/" className="myForm">
        <div className="container-img">
          <NasaPicture imageUrl={imgUrl} />
          <div className="container-txt">
            <h1>{title}</h1>
            <p>{info}</p>
          </div>
          
        </div>
          <p>Digite sua data de nascimento:</p>
          <input type="date" onChange={(e)=>{setUrl(`&date=${e.target.value}`)}}/>
      </form>
    
    
  );
}

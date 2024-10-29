import { NasaPicture } from "../../routes/NasaPicture"
import { useEffect, useState } from "react";
import "./NasaForm.css"
import { Loader } from "../Loader/Loader";
import axios from "axios";

export interface INasaFormProps {
}
export function NasaForm (props: INasaFormProps) {
  const [disabled, setDisabled] = useState("")
  const [url, setUrl] = useState("")
  const [preUrl, setPreUrl] = useState("")
  const [imgUrl, setImgUrl] = useState("https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg")
  const [info, setInfo] = useState("")
  const [title, setTitle] = useState("")
  const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N"
  const getData = async ()=>{
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}${url}`)
      const data = response.data
      
      setImgUrl(data.url)
      setTitle(data.title)
      setInfo(data.explanation)
      console.log(data)

    } catch (error) {
      console.log(error)
    }
    }


    useEffect(()=>{
      const fetchData = async () => {
        
        setDisabled(""); 
        await getData();    
        setTimeout(()=>{setDisabled("disabled")}, 3000)   
        ;
      };     
      fetchData() 
    },[url])


  return (
      <>
        <Loader disabled={disabled}/>
        <section >
          <form action="/" className="myForm">
            <div className="container-form">

              <div className="container-img">
                
                <NasaPicture imageUrl={imgUrl} />
              
                <div className="container-txt">
                  <h1>{title}</h1>
                  <p>{info}</p>
                </div> 

              </div>

            </div>
          
              <p>Digite sua data de nascimento:</p>
              <input type="date" onChange={(e)=>{setPreUrl(`&date=${e.target.value}`);}}/>
              <button type="button" onClick={()=>{setUrl(preUrl);}}>Buscar</button>
          </form>
        </section>        
      </>
  
  );
}

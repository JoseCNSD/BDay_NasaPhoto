import "./NasaForm.css";

import axios from "axios";
import dayjs from 'dayjs';

import { NasaPicture } from "../../routes/NasaPicture";
import { useEffect, useState } from "react";
import { Loader } from "../Loader/Loader";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Alert } from "@mui/material";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HdIcon from '@mui/icons-material/Hd';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

export interface INasaFormProps {
}

export function NasaForm(props: INasaFormProps) {
  const today = dayjs().format('YYYY/MM/DD');

  const [disabled, setDisabled] = useState("");
  const [erro, setErro] = useState("valid");
  const [valid, setValid] = useState(false);
  const [url, setUrl] = useState(today);
  const [preUrl, setPreUrl] = useState("");
  const [hdImgUrl, setHdImgUrl] = useState("");
  const [imgUrl, setImgUrl] = useState("https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg");
  const [info, setInfo] = useState("");
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null); 
  const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N";
  const firstImgDate = dayjs('1995-06-16');
  



  const isDateValid = selectedDate ? selectedDate.isAfter(firstImgDate) && selectedDate.isBefore(dayjs().add(1, 'day')) : false;

//Estilização dos botões - download e info
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
  const getData = async () => {
    try {
      const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}${url}`);
      const data = response.data;

      setImgUrl(data.url);
      setTitle(data.title);
      setInfo(data.explanation);
      setHdImgUrl(data.hdurl)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setDisabled("");
      await getData();
      setTimeout(() => { setDisabled("disabled") }, 3000);
    };
    fetchData();
  }, [url]);


  return (
    <>
      <Loader disabled={disabled} />
      <section>
        <form onSubmit={(event) => event.preventDefault()} className="myForm">
          <div className="container-txt">
            <h1>{title}</h1>
          </div>
          <div className="container-form">
            <div className="container-img">
              <NasaPicture imageUrl={url === today? "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGQ3bTdha3Y4bjVmcGlwbTRucGJ2cWk2b3A3czNydXAweTJ3YXQ3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/h8mB9WD5K406EM1wn2/giphy.gif": imgUrl}/>
              
              <div className="container-buttons"> 
                <Button className={url === today? "valid": "info-btn"} onClick={handleOpen}><InfoRoundedIcon className="info"/></Button>
                <a download target="_blank" href={hdImgUrl} className={url === today? "valid": "info-btn"} ><Button className="info-btn"><HdIcon className="hd"/></Button></a>
                  
              </div>
            </div>
            
          </div>
          
          <Modal
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
          

          

          <div className="inputs">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer  components={['DateField']}>
                <DateField
                  sx={{'& .MuiOutlinedInput-root fieldset': { borderRadius: '5px 0px 0px 5px', borderColor: 'white' }, '& .MuiOutlinedInput-root:hover fieldset': { borderColor: 'lightgray' }, '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'white' } }}
                  className="date-field"
                  minDate={firstImgDate}
                  disableFuture
                  label="Basic date field"
                  format="DD/MM/YYYY"
                  onChange={(newValue) => {
                    setSelectedDate(newValue); 
                    setPreUrl(`&date=${newValue?.format('YYYY-MM-DD')}`);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>

            <button
              className="btn-buscar"
              type="button"
              onClick={() => { 
                if (isDateValid){setErro("valid"); setUrl(preUrl);}
                else if(!isDateValid){
                  setErro("erro")
                }
             }} 
             
              // disabled={!isDateValid} 
            ><ImageSearchIcon className="search"/>              
            </button>
 
          </div>
          <p>Digite uma data posterior a <span>16/06/1995</span>:</p>
          <Alert className={erro} variant="filled" severity="error">
              Insira uma data válida, e tente novamente!
          </Alert>
        </form>
      </section>
    </>
  );
}









// import "./NasaForm.css"

// import axios from "axios";

// import { NasaPicture } from "../../routes/NasaPicture"
// import { useEffect, useState } from "react";
// import { Loader } from "../Loader/Loader";

// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateField } from '@mui/x-date-pickers/DateField';
// import dayjs from 'dayjs';

// export interface INasaFormProps {
// }
// export function NasaForm (props: INasaFormProps) {
//   const [disabled, setDisabled] = useState("")
//   const [valid, setValid] = useState(false)
//   const [url, setUrl] = useState("")
//   const [preUrl, setPreUrl] = useState("")
//   const [imgUrl, setImgUrl] = useState("https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg")
//   const [info, setInfo] = useState("")
//   const [title, setTitle] = useState("")
//   const apiKey = "OmKd3TuQFb2uV48b870JL5Z3AmXY8GjKxnALBD0N"
//   const firstImgDate = dayjs('1995-06-16')
//   const getData = async ()=>{
//     try {
//       const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}${url}`)
//       const data = response.data
      
//       setImgUrl(data.url)
//       setTitle(data.title)
//       setInfo(data.explanation)
//       console.log(data)

//     } catch (error) {
//       console.log(error)
//     }
//     }


//     useEffect(()=>{
//       const fetchData = async () => {
        
//         setDisabled(""); 
//         await getData();    
//         setTimeout(()=>{setDisabled("disabled")}, 3000)   
//         ;
//       };     
//       fetchData() 
//     },[url])


//   return (
//       <>
//         <Loader disabled={disabled}/>
//         <section >
          
//           <form action="/" className="myForm">
//             <div className="container-txt">
//               <h1>{title}</h1>
//             </div>
//             <div className="container-form">
//               <div className="container-img">
//                 <NasaPicture imageUrl={imgUrl} />
//               </div>
//             </div>
             
//             <p>Digite sua data de nascimento:</p>
            
//             <div className="inputs">
//               <LocalizationProvider dateAdapter={AdapterDayjs }>
//                 <DemoContainer components={['DateField']} >
//                 <DateField minDate={firstImgDate} disableFuture label="Basic date field" format="DD/MM/YYYY" onChange={(newValue) => setPreUrl(`&date=${newValue?.format('YYYY-MM-DD')}`)} />

//                 </DemoContainer>
//               </LocalizationProvider>

//               <button className="btn-buscar" type="button" onClick={()=>{if(){setUrl(preUrl);}}}>Buscar</button>
//             </div>
              
//           </form>
//         </section>  
       
//       </>
  
//   );
// }

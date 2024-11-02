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
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import HelpIcon from '@mui/icons-material/Help';

export interface INasaFormProps {
}

export function NasaForm(props: INasaFormProps) {
  const today = dayjs().format('YYYY/MM/DD');

  const [disabled, setDisabled] = useState("");
  const [erro, setErro] = useState("valid");
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

  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [openHelpModal, setOpenHelpModal] = useState(false);

  const handleOpenInfoModal = () => setOpenInfoModal(true);
  const handleCloseInfoModal = () => setOpenInfoModal(false);
  const handleOpenHelpModal = () => setOpenHelpModal(true);
  const handleCloseHelpModal = () => setOpenHelpModal(false);

  
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
      setHdImgUrl(data.hdurl);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setDisabled("");
      await getData();
      setTimeout(() => { setDisabled("disabled") }, 2500);
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
              <NasaPicture imageUrl={url === today ? "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGQ3bTdha3Y4bjVmcGlwbTRucGJ2cWk2b3A3czNydXAweTJ3YXQ3NyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/h8mB9WD5K406EM1wn2/giphy.gif" : imgUrl} />
              
              <div className="container-buttons"> 
                <Button className={url === today ? "valid" : "info-btn"} onClick={handleOpenInfoModal}>
                  <InfoRoundedIcon className="info"/>
                </Button>
                <a download target="_blank" href={hdImgUrl} className={url === today ? "valid" : "info-btn"}>
                  <Button className="info-btn">
                    <VisibilityIcon className="hd"/>
                  </Button>
                </a>                  
              </div>
            </div>
          </div>
          
          {/* Modal de Informações */}
          <Modal
            className="modal"
            open={openInfoModal}
            onClose={handleCloseInfoModal}
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
              <DemoContainer components={['DateField']}>
                <DateField
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { borderRadius: '5px', borderColor: 'white', height: '100%' },
                    '& .MuiOutlinedInput-root:hover fieldset': { borderColor: 'lightgray' },
                    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'white' }
                  }}
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
                if (isDateValid) { setErro("valid"); setUrl(preUrl); }
                else if (!isDateValid) {
                  setErro("erro");
                }
              }} 
            >
              Buscar<ImageSearchIcon className="search"/>            
            </button>
          </div>
          
          <p className="my-form-p">
            Digite uma data posterior a <span>16/06/1995</span>
             
              <HelpIcon className="help" onClick={handleOpenHelpModal}/>
          </p>
          
          <Alert className={erro} variant="filled" severity="error">
            Insira uma data válida, e tente novamente!
          </Alert>

          {/* Modal de Ajuda */}
          <Modal
            className="modal"
            open={openHelpModal}
            onClose={handleCloseHelpModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <h1>Por que isso?</h1>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <p>Os arquivos da base de dados da APOD só existem a partir de junho de 1995, então os nascidos antes dessa data não conseguem entrar na nova tendência. </p>
              </Typography>
            </Box>
          </Modal>
        </form>
      </section>
    </>
  );
}

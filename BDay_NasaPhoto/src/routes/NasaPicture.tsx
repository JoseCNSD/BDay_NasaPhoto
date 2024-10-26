import "./NasaPicture.css"
export interface INasaPictureProps {
  imageUrl?:string
}
export function NasaPicture ({imageUrl}: INasaPictureProps) {
  return (<img src={imageUrl} alt="NasaIcon" className="nasaImg"/>);
}

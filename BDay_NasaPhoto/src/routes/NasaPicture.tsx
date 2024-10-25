export interface INasaPictureProps {
    image_src?:string
}
export function NasaPicture ({image_src = "https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg"}: INasaPictureProps) {
  return (<img src={image_src} alt="NasaIcon" />);
}

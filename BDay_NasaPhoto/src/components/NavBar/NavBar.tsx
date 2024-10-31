import { Link } from "react-router-dom";
import "./NavBar.css"
import { useState } from "react";

export interface INavBarProps {
}

export function NavBar (props: INavBarProps) {
  const [buttonTxt, setButtonTxt] = useState("Ver data")

  return (
    <nav className="my-nav">
        <h1 className="my-h1">My<span className="my-span">Nasa</span>Picture</h1>
        <Link to={"/my-date-picture"} className="main-button">My Nasa Picture </Link>
        <Link to={"/"} className="main-button">Today's Picture </Link>
    </nav>
  );
}

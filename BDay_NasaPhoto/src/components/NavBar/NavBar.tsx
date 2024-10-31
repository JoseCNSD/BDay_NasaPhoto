import { Link } from "react-router-dom";
import "./NavBar.css"
import { useState } from "react";

export interface INavBarProps {
}

export function NavBar (props: INavBarProps) {


  return (
    <nav className="my-nav">
        <h1 className="my-h1">My<span className="my-span">Nasa</span>Picture</h1>
        <div className="container-nav-buttons">
          <Link to={"/my-date-picture"} className="date-button">By Date </Link>
          <Link to={"/"} className="today-button">Today </Link>
        </div>
    </nav>
  );
}

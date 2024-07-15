import { useState } from "react";
import cloche from '../assets/images/cloche.png';

function Header() {
    return (
        <header className="header">
            <div className="text">
                <h1 className="textAdmin"> ADMIN DASHBOARD</h1>
                <i class="fa-solid fa-user icon "></i>
                <h6>Thiaba Dione</h6>
            </div>
            <div className="header-rest">
                <button className="btn">
                    <img className="image " src={cloche} alt="clocheimage" /></button>
                <button className="btn1">Ajouter utilisateur </button>

            </div >



        </header>



    )

}
export default Header;

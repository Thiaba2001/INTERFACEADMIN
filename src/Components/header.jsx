import { useState } from "react";
import { color } from "framer-motion";

function Header() {
    return (
        <header className="header" style={{ marginLeft: '-10px', backgroundColor: '#e67e22' }}>
            <div className="text">
                <h1 className="textAdmin" style={{ color: 'white' }}> ADMIN DASHBOARD</h1>
                <i class="fa-solid fa-user icon "></i>
                <h6>Thiaba Dione</h6>
            </div>
            <div className="header-rest">
                <button className="btn">
                    <img className="image " src='../src/assets/images/cloche.png' alt="cloche" /></button>
                <button className="btn1">Ajouter utilisateur </button>

            </div >



        </header>



    )

}
export default Header;

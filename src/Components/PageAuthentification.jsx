import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageAuthentification.css";
function Authentification() {
    const navigate = useNavigate();

    const redirectToSidebarPage = (event) => {
        event.preventDefault();
        navigate("/sidebar");
    };


    return (
        <div>
            <div className="header">
                <div className="title">
                    <h1>DASBOARD D'ADMINISTRATION</h1>
                </div>
            </div>
            <div className="flip_card">
                <div className="flip_card_inner">
                    <div className="flip_card_front">
                        <form id="loginForm" onSubmit={redirectToSidebarPage}>
                            <input type="text" name="username" placeholder="login" required />
                            <input type="password" name="password" placeholder="password" required />
                            <button className="btn1" type="submit">
                                <i class="fa-solid fa-user-nurse"></i> Connexion
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Authentification;

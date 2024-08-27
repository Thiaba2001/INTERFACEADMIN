import { Link } from "react-router-dom";

function SideBar(props) {
    return (
        <aside className="sidebar sidebar-responsive">
            <h3 className="menu_text">TRAPPE ORANGE</h3>
            <div>
                <form>
                    <input style={{ marginTop: '23px', marginBottom: '15px', width: '245px', height: '20px' }} type="text" placeholder="search" />
                </form>
            </div>
            <div className="MenuContain">
                <ul className="MenuContain">
                    <li className="menucolor">
                        <i className="fa-solid fa-gauge icon1 fa-2x"></i>
                        <Link to="/dashboard" className="menubtn">Dashboard</Link>
                    </li>
                    <li>
                        <i className="fa-solid fa-screwdriver-wrench icon1 fa-2x"></i>
                        <Link to="/techniciandropdown" className="menubtn">Gestion Techniciens</Link>
                    </li>
                    <li>
                        <i className="fa-solid fa-business-time fa-2x icon1"></i>
                        <Link to="/historique" className="menubtn">Historiques</Link>
                    </li>
                    <li>
                        <i className="fa-solid fa-desktop fa-2x icon1"></i>
                        <a href="https://liveobjects.orange-business.com/#/liveobjects" target="_blank">
                            <button className="menubtn">Live Object</button>
                        </a>
                    </li>
                    <li>
                        <i className="fa fa-cogs icon1 fa-2x" aria-hidden="true"></i>
                        <Link to="/gestiontrappe" className="menubtn">Gestion Trappe</Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default SideBar;

import Navbar from "../../../components/NavBar";
import MainContent from "../../../components/ong/MainContent";
import SidePanel from "../../../components/ong/SidePanel";
import styles from './home.module.css';
import { Outlet } from "react-router-dom";

export default function Home() {

    return (
        <div className={styles.container}>
            <Navbar showButtonIndex={4} />

            <div className="workspace">
                <SidePanel />
                <div className="mainContent">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
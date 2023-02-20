import styles from "./Header.module.css";

import rocketIcon from "../assets/rocket.svg";

export function Header() {
    return (
        <header className={styles.header}>
            <img src={rocketIcon} alt="Rocket Icon" />
            <p>to<span>do</span></p>
        </header>
    );
}
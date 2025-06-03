import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.headerContainer}>
            <h1 aria-label="Focus up" className={styles.logo}>FoccusUp</h1>
        </header>
    )
}
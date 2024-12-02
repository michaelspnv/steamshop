import { Link } from "react-router-dom"
import styles from "./Home.module.scss"

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Магазин Steam Shop</p>
        <p className={styles.description}>
          Здесь вы можете купить ключи сотен игр по самым низким ценам!
        </p>
        <Link className={styles.link} to="/market">
          В каталог
        </Link>
      </div>
    </div>
  )
}

export { Home }

import { Link } from "react-router-dom"
import styles from "./ProductCard.module.scss"

function ProductCard({ id, name, image, price, isAvailable }) {
  return (
    <Link to={`/market/${id}`} className={styles.card}>
      <div
        className={styles.img}
        style={{ background: `no-repeat center/cover url(${image})` }}
      />
      <div className={styles.textContainer}>
        <p>{name}</p>
        <p>{price}$</p>
      </div>
      <div
        className={styles.availabilityMarker}
        style={{ backgroundColor: isAvailable ? "#0a0" : "#ff5050" }}
      >
        {isAvailable ? "В наличии" : "Нет в наличии"}
      </div>
    </Link>
  )
}

export { ProductCard }

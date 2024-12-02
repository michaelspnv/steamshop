import { useDispatch, useSelector } from "react-redux"
import { deleteItemById } from "../../store/features/cartSlice"
import { ItemCounter } from "../ItemCounter"
import styles from "./CartItem.module.scss"
import { Link } from "react-router-dom"

function CartItem({ id, title, price, imageUrl }) {
  const dispatch = useDispatch()

  const currentItem = useSelector((store) =>
    store.cart.items.find((currentItem) => currentItem.id === id)
  )

  const getTotalPrice = () => (currentItem.qty * price).toFixed(2)

  return (
    <div className={styles.wrapper}>
      <Link to={`/market/${id}`} className={styles.top}>
        <div
          className={styles.image}
          style={{ background: `no-repeat center/cover url(${imageUrl})` }}
        />
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <p className={styles.price}>{getTotalPrice()}$</p>
        </div>
      </Link>
      <div className={styles.bottom}>
        <div
          className={styles.deleteButton}
          onClick={() => dispatch(deleteItemById({ id }))}
        >
          Удалить
        </div>
        <ItemCounter id={id} />
      </div>
    </div>
  )
}

export { CartItem }

import { useDispatch, useSelector } from "react-redux"
import {
  increaseQtyById,
  decreaseQtyById,
} from "../../store/features/cartSlice"
import styles from "./ItemCounter.module.scss"

function ItemCounter({ id }) {
  const dispatch = useDispatch()

  const currentItem = useSelector((store) =>
    store.cart.items.find((currentItem) => currentItem.id === id)
  )

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.button}
        onClick={() => dispatch(decreaseQtyById({ id }))}
      >
        -
      </div>
      <input className={styles.input} value={currentItem.qty} readOnly />
      <div
        className={styles.button}
        onClick={() => dispatch(increaseQtyById({ id }))}
      >
        +
      </div>
    </div>
  )
}

export { ItemCounter }

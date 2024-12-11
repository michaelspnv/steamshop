import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart, deleteItemById } from "../../store/features/cartSlice"
import { ItemCounter } from "../ItemCounter"
import CrossIcon from "../../assets/cross.svg"
import styles from "./ProductCard.module.scss"

function ProductCard({ id, name, image, price, isAvailable }) {
  const dispatch = useDispatch()

  const addProductToCart = () => {
    const product = {
      id,
      name,
      image,
      price,
      qty: 1,
    }

    dispatch(addToCart({ product }))
  }

  const deleteProductFromCart = () => {
    dispatch(deleteItemById({ id }))
  }

  const isProductInCart = useSelector((store) =>
    store.cart.items.find((item) => item.id === id)
  )

  return (
    <div className={styles.card}>
      <div
        className={styles.img}
        style={{ background: `no-repeat center/cover url(${image})` }}
      />
      <div className={styles.textContainer}>
        <p>{name}</p>
        <div className={styles.bottomWrapper}>
          <p>{price}$</p>
          {isProductInCart ? (
            <div className={styles.buttonWrapper}>
              <button
                className={styles.deleteButton}
                onClick={deleteProductFromCart}
              >
                <img className={styles.crossIcon} src={CrossIcon} alt="" />
              </button>
              <ItemCounter id={id} />
            </div>
          ) : (
            <button
              className={styles.addToCartButton}
              onClick={addProductToCart}
            >
              Добавить
            </button>
          )}
        </div>
      </div>
      <div
        className={styles.availabilityMarker}
        style={{ backgroundColor: isAvailable ? "#0a0" : "#ff5050" }}
      >
        {isAvailable ? "В наличии" : "Нет в наличии"}
      </div>
    </div>
  )
}

export { ProductCard }

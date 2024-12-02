import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { CartItem } from "../../components/CartItem"
import styles from "./Cart.module.scss"

function Cart() {
  const items = useSelector((store) => store.cart.items)

  return (
    <div className={styles.container}>
      <p className={styles.title}>Корзина</p>
      {items.length ? (
        <>
          {items.map(({ id, name, image, price }) => (
            <CartItem
              key={id}
              id={id}
              title={name}
              price={price}
              imageUrl={image}
            />
          ))}
          <div className={styles.totalWrapper}>
            <span>Товаров в корзине: </span>
            <span className={styles.total}>
              {items.reduce((total, item) => total + item.qty, 0)}
            </span>
          </div>
          <div className={styles.sumWrapper}>
            <span>Итого к оплате: </span>
            <span className={styles.sum}>
              {items
                .reduce((sum, item) => sum + item.qty * item.price, 0)
                .toFixed(2)}
              $
            </span>
          </div>
          <Link className={styles.toPaymentButton} to="/payment">
            Перейти к оформлению
          </Link>
        </>
      ) : (
        "Ваша корзина пуста."
      )}
    </div>
  )
}

export { Cart }

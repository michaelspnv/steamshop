import { Link, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import styles from "./Layout.module.scss"

function Layout() {
  const cartItemsCount = useSelector((store) => store.cart.items.length)

  return (
    <div className={styles.layout}>
      <ul className={styles.menu}>
        <Link className={styles.link} to="/">
          Главная
        </Link>
        <Link className={styles.link} to="/market">
          Каталог
        </Link>
        <div className={styles.wrapper}>
          <Link className={styles.link} to="/cart">
            Корзина
          </Link>
          <div
            className={styles.cartItemsCounter}
            style={{ display: cartItemsCount ? "block" : "none" }}
          >
            {cartItemsCount}
          </div>
        </div>
      </ul>
      <Outlet />
    </div>
  )
}

export { Layout }

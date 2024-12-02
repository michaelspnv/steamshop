import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { resetCart } from "../../store/features/cartSlice"
import { Link } from "react-router-dom"
import styles from "./Success.module.scss"

function Success() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetCart())
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.mainText}>Ключ отправлен на Вашу почту.</p>
      <Link className={styles.returnButton} to="/market">
        Вернуться в каталог
      </Link>
    </div>
  )
}

export { Success }

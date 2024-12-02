import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Error404 } from "../../pages/Error404"
import styles from "./Payment.module.scss"

function Payment() {
  const navigate = useNavigate()

  const [emailInputValue, setEmailInputValue] = useState("")

  const cartItems = useSelector((store) => store.cart.items)

  const purchasedGames = []
  for (let i = 0; i < cartItems.length; i++) {
    purchasedGames.push({
      name: cartItems[i].name,
      qty: cartItems[i].qty,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const reqBody = {
      purchasedGames,
      emailInputValue,
    }

    try {
      await fetch("https://steamshop-api.vercel.app/api/send_key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      })
      navigate("/success")
    } catch (_) {
      return <Error404 />
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Оплата заказа</p>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="email">
          E-Mail
        </label>
        <input
          className={styles.input}
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          onChange={(e) => setEmailInputValue(e.target.value)}
          value={emailInputValue}
        />
        <label className={styles.label} htmlFor="card_number">
          Номер банковской карты
        </label>
        <input
          className={styles.input}
          type="number"
          name="card_number"
          id="card_number"
          placeholder="1234-1234-1234-1234"
        />
        <label className={styles.label} htmlFor="exp_date">
          Срок действия
        </label>
        <input
          className={styles.input}
          type="text"
          name="exp_date"
          id="exp_date"
          placeholder="01/28"
        />
        <label className={styles.label} htmlFor="cvc">
          CVC-код
        </label>
        <input
          className={styles.input}
          type="number"
          name="cvc"
          id="cvc"
          placeholder="111"
        />
        <button className={styles.submitButton} type="submit">
          Оплатить
        </button>
      </form>
    </div>
  )
}

export { Payment }

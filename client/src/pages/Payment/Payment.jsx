import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useTelegram } from "../../hooks/useTelegram"
import { Error404 } from "../../pages/Error404"
import styles from "./Payment.module.scss"

function Payment() {
  const navigate = useNavigate()

  const { tg, queryId } = useTelegram()

  const [emailInputValue, setEmailInputValue] = useState("")

  const cartItems = useSelector((store) => store.cart.items)

  const purchasedGames = []
  for (let i = 0; i < cartItems.length; i++) {
    purchasedGames.push({
      name: cartItems[i].name,
      qty: cartItems[i].qty,
    })
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()

  //   const reqBody = {
  //     purchasedGames,
  //     emailInputValue,
  //   }

  //   try {
  //     await fetch("https://steamshop-api.vercel.app/api/send_key", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(reqBody),
  //     })
  //     navigate("/success")
  //   } catch (_) {
  //     return <Error404 />
  //   }
  // }

  const onClick = () => {
    const purchasedGames = []
    for (let i = 0; i < cartItems.length; i++) {
      purchasedGames.push({
        name: cartItems[i].name,
        qty: cartItems[i].qty,
      })
    }

    const data = {
      queryId,
      purchasedGames,
    }

    fetch("https://0f3p2814-5000.euw.devtunnels.ms/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchasedGames),
    })

    fetch("https://0f3p2814-5000.euw.devtunnels.ms/web-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  }

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Оплатить",
    })
    tg.onEvent("mainButtonClicked", onClick)

    return () => {
      tg.offEvent("mainButtonClicked", onClick)
    }
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.title}>Оплата заказа</p>
      <form>
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
      </form>
    </div>
  )
}

export { Payment }

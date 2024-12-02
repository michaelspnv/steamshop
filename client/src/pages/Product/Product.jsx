import { useParams, useNavigate } from "react-router-dom"
import { useGetGameByIdQuery } from "../../services/games"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../store/features/cartSlice"
import { Error404 } from "../Error404"
import styles from "./Product.module.scss"

function Product() {
  const dispatch = useDispatch()

  const { id } = useParams()
  const { data, isLoading, isError } = useGetGameByIdQuery(id)

  const addProductToCart = () => {
    const dataCopy = {}
    const product = Object.assign(dataCopy, data)
    product.id = id
    product.qty = 1

    dispatch(addToCart({ product }))
  }

  const isProductInCart = useSelector((store) =>
    store.cart.items.find((item) => item.id === id)
  )

  const navigate = useNavigate()

  const handleClick = () => {
    if (isProductInCart) {
      navigate("/cart")
      return
    }
    addProductToCart()
  }

  const getButtonColor = () => {
    if (!data["is_available"]) return "#4e4e4e"
    if (isProductInCart) return "#00ab00"
    return "#0080ff"
  }

  const getButtonText = () => {
    if (!data["is_available"]) return "Ожидается поступление"
    if (isProductInCart) return "Перейти в корзину"
    return "Добавить в корзину"
  }

  if (isError) return <Error404 />

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <span className={styles.loader} />
        </div>
      ) : (
        <>
          <p className={styles.title}>{data.name}</p>
          <div
            className={styles.img}
            style={{ background: `no-repeat center/cover url(${data.image})` }}
          />
          <div className={styles.wrapper}>
            <button
              className={styles.addToCartButton}
              onClick={handleClick}
              style={{
                backgroundColor: getButtonColor(),
                color: data["is_available"] ? "#fff" : "#8e8e8e",
              }}
              disabled={!data["is_available"]}
            >
              {getButtonText()}
            </button>
            <div>
              <span className={styles.priceTitle}>Цена: </span>
              <span className={styles.price}>{data.price}$</span>
            </div>
          </div>
          <div className={styles.ratingWrapper}>
            <span className={styles.ratingTitle}>Рейтинг: </span>
            <span className={styles.rating}>{data.rating} из 5</span>
          </div>
          <div className={styles.releaseDateWrapper}>
            <span className={styles.releaseDateTitle}>Дата релиза: </span>
            <span className={styles.releaseDate}>{data["release_date"]}</span>
          </div>
          <p className={styles.subtitle}>Описание</p>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </>
      )}
    </div>
  )
}

export { Product }

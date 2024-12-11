import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useTelegram } from "../../hooks/useTelegram"
import { ProductCard } from "../../components/ProductCard"
import { Error404 } from "../Error404"
import { useGetGamesByNameQuery } from "../../services/games"
import { resetCart } from "../../store/features/cartSlice"
import searchBarIcon from "../../assets/search.svg"
import styles from "./SearchResults.module.scss"

function SearchResults() {
  const dispatch = useDispatch()

  const { tg } = useTelegram()

  const isCartEmpty = useSelector((store) => !Boolean(store.cart.items.length))

  const onClick = () => {
    navigate("/payment")
    tg.BackButton.show()
    tg.onEvent("backButtonClicked", () => {
      navigate("/market")
      dispatch(resetCart())
    })
  }

  useEffect(() => {
    tg.BackButton.hide()
    tg.MainButton.setParams({
      text: "Перейти к оформлению",
      color: "#0080ff",
    })
    tg.onEvent("mainButtonClicked", onClick)

    return () => {
      tg.offEvent("mainButtonClicked", onClick)
    }
  }, [])

  useEffect(() => {
    if (isCartEmpty) tg.MainButton.hide()
    else tg.MainButton.show()
  }, [isCartEmpty])

  const [searchParams] = useSearchParams()

  const [inputValue, setInputValue] = useState(searchParams.get("keyword"))

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const navigate = useNavigate()

  const handleSearch = () => {
    if (inputValue.length < 3) return
    navigate(`/search?keyword=${inputValue}`)
  }

  const offset = useSelector((state) => state.dbOffset.searchOffset)

  const { data, isLoading, isError } = useGetGamesByNameQuery(
    searchParams.get("keyword")
  )

  if (isError) return <Error404 />

  return (
    <div className={styles.container}>
      <p className={styles.title}>Ключи Steam</p>
      <div className={styles.searchBarWrapper}>
        <input
          className={styles.searchBar}
          type="text"
          placeholder="Поиск..."
          onChange={handleChange}
          value={inputValue}
        />
        <img
          className={styles.searchBarIcon}
          src={searchBarIcon}
          alt="search-icon"
          onClick={handleSearch}
        />
      </div>
      <p className={styles.resultsAmount}>
        По вашему запросу найдено {data?.length} результатов.
      </p>
      {isLoading ? (
        <div className={styles.wrapper}>
          <span className={styles.loader} />
        </div>
      ) : (
        <div className={styles.grid}>
          {data.map(({ id, name, image, price, is_available }) => {
            return (
              <ProductCard
                key={id}
                id={id}
                name={name}
                image={image}
                price={price}
                isAvailable={is_available}
              />
            )
          })}
        </div>
      )}
      <div
        className={styles.showMoreButton}
        onClick={() => dispatch(changeOffset({ newValue: offset + 10 }))}
      >
        Показать ещё...
      </div>
    </div>
  )
}

export { SearchResults }

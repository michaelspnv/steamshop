import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { changeOffset } from "../../store/features/dbOffsetSlice"
import { useGetGamesQuery } from "../../services/games"
import { ProductCard } from "../../components/ProductCard"
import { Error404 } from "../Error404"
import searchBarIcon from "../../assets/search.svg"
import styles from "./Market.module.scss"

function Market() {
  const dispatch = useDispatch()

  const [inputValue, setInputValue] = useState("")

  const handleChange = (event) => {
    setInputValue(event.target.value)
  }

  const navigate = useNavigate()

  const handleSearch = () => {
    if (inputValue.length < 3) return
    navigate(`/search?keyword=${inputValue}`)
  }

  const offset = useSelector((state) => state.dbOffset.value)

  const { data, isLoading, isError } = useGetGamesQuery(offset)

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
      {isLoading ? (
        <div className={styles.wrapper}>
          <span className={styles.loader} />
        </div>
      ) : (
        data.map(({ id, name, image, price, is_available }) => {
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
        })
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

export { Market }

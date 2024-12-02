import { useState } from "react"
import { useSelector } from "react-redux"
import { useSearchParams, useNavigate } from "react-router-dom"
import { ProductCard } from "../../components/ProductCard"
import { Error404 } from "../Error404"
import { useGetGamesByNameQuery } from "../../services/games"
import searchBarIcon from "../../assets/search.svg"
import styles from "./SearchResults.module.scss"

function SearchResults() {
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
      <p className={styles.title}>Ключи Steam {offset}</p>
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
        data?.map(({ id, name, image }) => {
          return <ProductCard key={id} id={id} name={name} image={image} />
        })
      )}
    </div>
  )
}

export { SearchResults }

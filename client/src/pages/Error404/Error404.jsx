import styles from "./Error404.module.scss"

function Error404() {
  return (
    <div className={styles.container}>
      <p className={styles.mainText}>Запрашиваемая страница не найдена :(</p>
    </div>
  )
}

export { Error404 }

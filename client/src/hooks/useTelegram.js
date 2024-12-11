const tg = window.Telegram.WebApp

export function useTelegram() {
  const close = () => {
    tg.close()
  }

  const toggleMainButton = () => {
    if (tg.MainButton.isVisible) tg.MainButton.hide()
    else tg.MainButton.show()
  }

  return {
    tg,
    close,
    toggleMainButton,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  }
}

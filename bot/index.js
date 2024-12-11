const TelegramBot = require("node-telegram-bot-api")
const express = require("express")
const cors = require("cors")
const mysql = require("mysql2")
require("dotenv").config()

const token = process.env.TOKEN
const webAppUrl = "https://gorgeous-lamington-547084.netlify.app/market"

const bot = new TelegramBot(token, { polling: true })
const app = express()

app.use(express.json())
app.use(cors())

let userId

bot.on("message", async (msg) => {
  const chatId = msg.chat.id
  const text = msg.text
  userId = msg.from.id

  if (text === "/start") {
    await bot.sendMessage(
      chatId,
      "Привет, mshk qspnv!\n\nС помощью этого бота вы можете купить ключи игр Steam по самым низким ценам.\n\nВыберите, что вы хотите сделать:",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Выбрать ключи",
                web_app: { url: webAppUrl },
              },
            ],
            [
              {
                text: "Просмотреть историю заказов",
                callback_data: "show_history",
              },
            ],
          ],
        },
      }
    )
  }
})

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id

  if (callbackQuery.data === "show_history") {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "orders",
      password: "Lalka_337",
    })

    connection.connect((err) => {
      if (err) {
        return console.error("Ошибка: " + err.message)
      } else {
        console.log("Подключение к серверу MySQL успешно установлено.")
      }
    })

    const sql = `SELECT * FROM user_order WHERE user_id = ${userId} ORDER BY created_at DESC`

    const getFormattedTime = (time) => {
      const hours = time.getHours()
      let minutes = time.getMinutes()
      if (minutes < 10) minutes = `0${minutes}`
      let seconds = time.getSeconds()
      if (seconds < 10) seconds = `0${seconds}`

      return `${hours}.${minutes}.${seconds}`
    }

    connection.query(sql, async (err, results) => {
      if (err) console.log(err)
      else {
        let msg = "Ваши последние заказы:\n\n"
        for (let i = 0; i < results.length; i++) {
          msg +=
            results[i]["created_at"].getDate() +
            "." +
            (results[i]["created_at"].getMonth() + 1) +
            "." +
            results[i]["created_at"].getFullYear() +
            " в " +
            getFormattedTime(results[i]["created_at"]) +
            ":\n"
          msg +=
            results[i]["game_name"] + " (кол-во) x" + results[i]["qty"] + "\n\n"
        }
        await bot.sendMessage(chatId, msg)
        console.log("Данные прочитаны.")
      }
    })

    connection.end((err) => {
      if (err) {
        return console.log("Ошибка: " + err.message)
      }
      console.log("Подключение закрыто.")
    })
  }
})

app.post("/web-data", (req, res) => {
  const { queryId, purchasedGames } = req.body

  function generateKey() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    const segments = []

    for (let i = 0; i < 3; i++) {
      let segment = ""
      for (let j = 0; j < 5; j++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      segments.push(segment)
    }

    return segments.join("-")
  }

  let replyMsg = "Ваши приобретенные ключи:\n\n"

  purchasedGames.forEach((game) => {
    replyMsg += game.name + ":\n"
    for (let i = 0; i < game.qty - 1; i++) {
      replyMsg += generateKey() + ",\n"
    }
    replyMsg += generateKey() + "\n\n"
  })

  try {
    bot.answerWebAppQuery(queryId, {
      type: "article",
      id: queryId,
      title: "Успешная покупка",
      input_message_content: { message_text: replyMsg },
    })
  } catch (e) {
    console.log(e)
  }
  res.status(200).json({})
})

app.post("/create-order", async (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "orders",
    password: "Lalka_337",
  })

  connection.connect((err) => {
    if (err) {
      return console.error("Ошибка: " + err.message)
    } else {
      console.log("Подключение к серверу MySQL успешно установлено.")
    }
  })

  const purchasedGames = req.body

  const ordersInfo = []

  for (let i = 0; i < purchasedGames.length; i++) {
    const purchasedGameInfo = [
      userId,
      purchasedGames[i].name,
      purchasedGames[i].qty,
    ]
    ordersInfo.push(purchasedGameInfo)
  }

  const sql = "INSERT INTO user_order(user_id, game_name, qty) VALUES ?"

  connection.query(sql, [ordersInfo], (err) => {
    if (err) console.log(err)
    else console.log("Данные добавлены.")
  })

  connection.end((err) => {
    if (err) {
      return console.log("Ошибка: " + err.message)
    }
    console.log("Подключение закрыто.")
  })

  res.status(200).json({})
})

const PORT = 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))

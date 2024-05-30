const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = 9000

// Разрешаем CORS для всех доменов
app.use(cors())

const DATA_URL = 'https://jsonplaceholder.typicode.com/comments'

//переменная для хранения кешированных данных, чтобы не запрашивать каждый раз 500 комментов
let cachedData = []

// Получение данных
const loadData = async () => {
  try {
    const response = await axios.get(DATA_URL)
    cachedData = response.data
    console.log('Data loaded and cached')
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

//загрузка данных один раз при запуске сервера
loadData()

// Получение данных с пагинацией и поиском
app.get('/comments', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query

  // Поиск
  const filteredData = cachedData.filter(
    (comment) =>
      comment.name.includes(search) ||
      comment.email.includes(search) ||
      comment.body.includes(search)
  )

  // Пагинация
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + Number(limit)
  const paginatedData = filteredData.slice(startIndex, endIndex)

  res.json({
    page: Number(page),
    limit: Number(limit),
    total: filteredData.length,
    data: paginatedData,
  })
})

// Получение одного коммента по ID
app.get('/comments/:id', async (req, res) => {
  const { id } = req.params
  const comment = cachedData.find((comment) => comment.id === Number(id))

  if (comment) {
    res.json(comment)
  } else {
    res.status(404).json({ message: 'Comment not found' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

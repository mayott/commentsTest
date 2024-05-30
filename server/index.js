const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
const PORT = 9000

// Разрешаем CORS для всех доменов
app.use(cors())

const DATA_URL = 'https://jsonplaceholder.typicode.com/comments'

// Получение данных
const fetchData = async () => {
  try {
    const response = await axios.get(DATA_URL)
    return response.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

// Получение данных с пагинацией и поиском
app.get('/comments', async (req, res) => {
  const { page = 1, limit = 10, search = '' } = req.query
  const data = await fetchData()

  // Поиск
  const filteredData = data.filter(
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
  const data = await fetchData()

  const comment = data.find((comment) => comment.id === Number(id))

  if (comment) {
    res.json(comment)
  } else {
    res.status(404).json({ message: 'Comment not found' })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

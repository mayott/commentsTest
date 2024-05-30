import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//получение списка комментариев
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async ({ page, limit, search }) => {
    const response = await axios.get('http://localhost:9000/comments', {
      params: { page, limit, search },
    })
    return response.data
  }
)

//получение конкретного комментария по ID
export const fetchCommentById = createAsyncThunk(
  'comments/fetchCommentById',
  async (id) => {
    const response = await axios.get(`http://localhost:9000/comments/${id}`)
    return response.data
  }
)

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
    currentComment: null,
    page: 1,
    limit: 10,
    search: '',
    mode: 'table',
  },
  //редюсеры для установки:
  reducers: {
    //текущей страницы
    setPage(state, action) {
      state.page = action.payload
    },
    //лимита айтемов на странице
    setLimit(state, action) {
      state.limit = action.payload
    },
    //строки поиска
    setSearch(state, action) {
      state.search = action.payload
    },
    //режима отображения данных
    setMode(state, action) {
      state.mode = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      //начало загрузки списка комментов
      .addCase(fetchComments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      //успешная загрузка
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.data
        state.total = action.payload.total
      })
      //ошибка
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      //начало загрузки отдельного коммента
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      //успешная загрузка
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false
        state.currentComment = action.payload
      })
      //ошибка
      .addCase(fetchCommentById.rejected, (state, action) => {
        console.log(action)
        state.loading = false
        state.error = action.error.message
      })
  },
})

//действия для использования в компонентах с помощью dispatch()
export const { setPage, setLimit, setSearch, setMode } = commentsSlice.actions

//сам редюсер для добавления в стор
export default commentsSlice.reducer

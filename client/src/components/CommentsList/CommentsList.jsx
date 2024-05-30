import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EuiButtonGroup, EuiFieldSearch } from '@elastic/eui'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import {
  fetchComments,
  setPage,
  setLimit,
  setSearch,
  setMode,
} from '../../redux/commentsSlice'
import CommentsTable from './CommentsTable/CommentsTable'
import CodeBlock from './CodeBlock/CodeBlock'

// Массив кнопок для изменения варианта отображения
const modeButtons = [
  {
    id: 'json',
    label: 'JSON',
    value: 'json',
  },
  {
    id: 'table',
    label: 'Table',
    value: 'table',
  },
]

const CommentsList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    items: comments,
    total,
    loading,
    error,
    page,
    limit,
    search,
    mode,
  } = useSelector((state) => state.comments)

  // Локальное состояние для инпута поиска
  const [localSearch, setLocalSearch] = useState(search)

  //Колонки для таблицы
  const columns = [
    {
      field: 'id',
      name: 'ID',
      width: '10%',
    },
    {
      field: 'name',
      name: 'Name',
      truncateText: true,
      width: '20%',
      render: (name, comment) => (
        <Link to={`/comments/${comment.id}`} state={{ page, limit, search }}>
          {name}
        </Link>
      ),
    },
    {
      field: 'email',
      name: 'E-mail',
      width: '15%',
      truncateText: true,
    },
    {
      field: 'body',
      name: 'Comment',
      truncateText: true,
    },
  ]

  //Получаем комментарии при изменении страницы, поиске
  useEffect(() => {
    dispatch(fetchComments({ page, limit, search }))
  }, [dispatch, page, limit, search])

  //Поддерживаем отображение query в адресной строке
  useEffect(() => {
    navigate(`?page=${page}&limit=${limit}&search=${search}`)
  }, [page, limit, search, history, navigate])

  // Дебаунс функция для оптимизации поиска
  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setSearch(value))
      dispatch(setPage(1))
    }, 500),
    []
  )

  //Поиск
  const handleSearchChange = (e) => {
    const value = e.target.value
    setLocalSearch(value)
    debouncedSearch(value)
  }

  //Обработка изменения варианта отображения данных
  const handleModeChange = (mode) => {
    dispatch(setMode(mode))
  }

  //Обработка пагинации
  const handlePageChange = ({ page: { index, size } }) => {
    dispatch(setPage(index + 1))
    dispatch(setLimit(size))
  }

  return (
    <>
      <EuiButtonGroup
        legend='Presentation mode options'
        options={modeButtons}
        idSelected={mode}
        onChange={handleModeChange}
      />
      {mode === 'json' ? (
        <CodeBlock comments={comments} loading={loading} />
      ) : (
        <CommentsTable
          columns={columns}
          handleSearchChange={handleSearchChange}
          handlePageChange={handlePageChange}
          searchValue={localSearch}
        />
      )}
    </>
  )
}

export default CommentsList

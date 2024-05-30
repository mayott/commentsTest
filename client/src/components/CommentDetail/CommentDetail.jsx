import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCommentById } from '../../redux/commentsSlice'
import {
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiHorizontalRule,
  EuiLoadingSpinner,
  EuiText,
  EuiTextColor,
} from '@elastic/eui'

function CommentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    currentComment: comment,
    loading,
    error,
    page,
    limit,
    search,
  } = useSelector((state) => state.comments)

  //Получение коммента по ID
  useEffect(() => {
    dispatch(fetchCommentById(id))
  }, [dispatch, id])

  //обработка нажатия на кнопку, чтобы вернуться на список с тем же query, что было
  const handleBackClick = () => {
    navigate(`/?page=${page}&limit=${limit}&search=${search}`)
  }

  if (loading) {
    return <EuiLoadingSpinner size='xl' />
  }

  if (error || !comment) {
    return (
      <EuiEmptyPrompt
        color='danger'
        iconType='error'
        title={<h2>{error?.message || 'No comment found'}</h2>}
      />
    )
  }

  return (
    <EuiFlexGroup direction='column'>
      <EuiText size='m'>
        <h3>{comment.name}</h3>
        <p>
          <EuiTextColor color='subdued'>{comment.email}</EuiTextColor>
        </p>

        <EuiHorizontalRule margin='s' />
        <p>{comment.body}</p>
      </EuiText>

      <EuiButton iconType='arrowLeft' onClick={handleBackClick}>
        Back to all comments
      </EuiButton>
    </EuiFlexGroup>
  )
}

export default CommentDetail

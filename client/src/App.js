import './App.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import CommentsList from './components/CommentsList/CommentsList'
import CommentDetail from './components/CommentDetail/CommentDetail'

//создание роутера с маршрутами
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* список комментариев */}
      <Route exact path='/' element={<CommentsList />} />
      {/* конкретный комментарий, выбранный из списка */}
      <Route path='/comments/:id' element={<CommentDetail />} />
    </>
  )
)

function App() {
  return (
    <div className='app-container'>
      <header className='app-header'>
        <h1>Comments viewer</h1>
      </header>

      {/* подключаем роутер к приложению */}
      <RouterProvider router={router} />
    </div>
  )
}

export default App

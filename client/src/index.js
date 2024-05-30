import '@elastic/eui/dist/eui_theme_light.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { EuiProvider } from '@elastic/eui'
import store from './redux/store'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/* подключаем хранилище к приложению */}
    <Provider store={store}>
      {/* подключаем стили elastic ui */}
      <EuiProvider>
        <App />
      </EuiProvider>
    </Provider>
  </React.StrictMode>
)

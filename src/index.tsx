import { StrictMode } from 'react'
import * as ReactDOM from "react-dom"
import { App } from './App/App';
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>,
  </StrictMode>,
  document.getElementById('root') as HTMLElement
)
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Router } from './router/Router'
import { store } from './store/store'

export const App = () => {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
  )
}

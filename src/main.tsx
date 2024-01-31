import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'
import SuccesProvider from './hooks/useSucces.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SuccesProvider>
        <App />
      </SuccesProvider>
    </Provider>
  </BrowserRouter>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ShopProvider from './context/shop/ShopProvider'
import './index.css'
import './normalize.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>,
)

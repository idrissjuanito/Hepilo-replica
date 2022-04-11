import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Home from './Home'
import Login from './Login'
import ShoppingList from './list/ShoppingList'
import Manage from './list/Manage'
import { ProtectedRoute } from './list/Main'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { User } from './store'

ReactDOM.render(
  <React.StrictMode>
    <User>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="manage/items" element={<Manage name="items" />} />
              <Route
                path="manage/categories"
                element={<Manage name="categories" />}
              />
              <Route path="manage/lists" element={<Manage name="lists" />} />
              <Route path="lists">
                <Route path=":id" element={<ShoppingList />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </User>
  </React.StrictMode>,
  document.getElementById('root')
)

import React from 'react'
import AddTask from './pages/Task/AddTask'
import { Route, Routes } from 'react-router-dom'
import ListTask from './pages/Task/ListTask'

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<ListTask />} />
        <Route path="/add-task/:id?" element={<AddTask />} />
      </Routes>
    </>
  )
}

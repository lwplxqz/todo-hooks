/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
import React, { useState } from 'react'
import * as ReactDOMClient from 'react-dom/client'

import './index.css'

import AppHeader from './components/app-header/app-header'
import TodoList from './components/todo-list/todo-list'
import Footer from './components/footer/footer'

const root = ReactDOMClient.createRoot(document.querySelector('.app'))

function App() {


  const maxId = () => {
    return Math.random()
  }


  const createTodoItem = (label, minutes = 0, seconds = 0) => {
    const timeLeft = Number(minutes) * 60 + Number(seconds)
    return {
      label,
      done: false,
      id: maxId(),
      timeLeft
    }
  }

  const [todoData, setTodoData] = useState([
    createTodoItem('Drink Cofee', 0, 30),
    createTodoItem('Make Awesome App', 2, 30),
    createTodoItem('Take a break', 1, 30),
  ])
  const [movieFilter, setmovieFilter] = useState('all')

  const editLabel = (label, id) => {
    setTodoData((prevState) => {
      const itemIdx = prevState.findIndex((element) => element.id === id)

      return ([...prevState.slice(0, itemIdx), { ...prevState[itemIdx], label }, ...prevState.slice(itemIdx + 1)])

    })
  }

  const deleteItem = (id) => {
    setTodoData((prevState) => {
      const itemIdx = prevState.findIndex((element) => element.id === id)

      return ([...prevState.slice(0, itemIdx), ...prevState.slice(itemIdx + 1)])
    })
  }

  const onToggleDone = (id) => {
    setTodoData((prevState) => {
      const itemIdx = prevState.findIndex((element) => element.id === id)

      const oldItem = prevState[itemIdx]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newArr = [...prevState.slice(0, itemIdx), newItem, ...prevState.slice(itemIdx + 1)]
      return newArr
    })
  }

  const switchFilter = (filter) => {
    setmovieFilter(filter)
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((item) => !item.done))
  }



  const onTimerChange = (time, id) => {
    setTodoData((prevState) => {
      const itemIdx = prevState.findIndex((element) => element.id === id)

      const oldItem = prevState[itemIdx]
      const newItem = { ...oldItem, timeLeft: time <= 0 ? 0 : time }

      const newArr = [...prevState.slice(0, itemIdx), newItem, ...prevState.slice(itemIdx + 1)]
      return newArr
    })
  }



  const appendTodoItem = (label, minutes, seconds) => {
    setTodoData((prevState) => ([...prevState, createTodoItem(label, minutes, seconds)]))
  }

  const filter = (items, f) => {
    switch (f) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.done)
      case 'completed':
        return items.filter((item) => item.done)
      default:
        return items
    }
  }

  const todoLeft = todoData.filter((el) => !el.done).length

  const itemsToRender = filter(todoData, movieFilter)
  return (
    <section className="todoapp">
      <AppHeader appendTodoItem={appendTodoItem} />
      <section className="main">
        <TodoList todos={itemsToRender} onDeleted={deleteItem} onToggleDone={onToggleDone} editLabel={editLabel} onTimerChange={onTimerChange} />
        <Footer
          left={todoLeft}
          filter={filter}
          switchFilter={switchFilter}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  )
}


root.render(<App />)

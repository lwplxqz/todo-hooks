/* eslint-disable prettier/prettier */

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task.css'

export default function NewTaskPanel({ appendTodoItem }) {
  const [label, setLabel] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')

  const onSecondChange = (e) => {
    setSeconds(e.target.value)
  }

  const onMinuteChange = (e) => {
    setMinutes(e.target.value)
  }

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onTaskSubmit = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      appendTodoItem(label, minutes, seconds)
      setLabel('')
      setMinutes('')
      setSeconds('')
    }
  }

  return (

    <form className="new-todo-form">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={onTaskSubmit}
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="number"
        min='0'
        className="new-todo-form__timer"
        placeholder="Min"
        onKeyDown={onTaskSubmit}
        onChange={onMinuteChange}
        value={minutes}
      />
      <input
        type="number"
        min='0'
        className="new-todo-form__timer"
        placeholder="Sec"
        onKeyDown={onTaskSubmit}
        onChange={onSecondChange}
        value={seconds}
      />
    </form>
  )

}


NewTaskPanel.defaultProps = {
  appendTodoItem: () => { },
}
NewTaskPanel.propTypes = {
  appendTodoItem: PropTypes.func,
}

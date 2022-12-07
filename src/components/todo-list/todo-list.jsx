/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

import TodoListItem from '../todo-list-item/todo-list-item'

import './todo-list.css'

function TodoList({ todos, onDeleted, onToggleDone, editLabel, onTimerChange }) {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item
    return (
      <TodoListItem {...itemProps} key={id} id={id} onDeleted={() => onDeleted(id)} onToggleDone={() => onToggleDone(id)} editLabel={editLabel} onTimerChange={onTimerChange} />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => { },
  onToggleDone: () => { },
}

TodoList.propTypes = {
  todos: PropTypes.instanceOf(Array),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TodoList

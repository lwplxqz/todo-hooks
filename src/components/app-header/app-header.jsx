/* eslint-disable import/namespace */
/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

import NewTaskPanel from '../new-task/new-task'

import './app-header.css'

function AppHeader({ appendTodoItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <NewTaskPanel appendTodoItem={appendTodoItem} />
    </header>
  )
}

AppHeader.defaultProps = {
  appendTodoItem: () => { },
}

AppHeader.propTypes = {
  appendTodoItem: PropTypes.func,
}

export default AppHeader

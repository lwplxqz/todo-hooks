/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'

import './footer.css'


export default function Footer({ left, filter, switchFilter, clearCompleted }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]


  const buttons = buttonsData.map(({ name, label }) => (
    <li key={name}>
      <button
        type='button'
        className={filter === name ? 'selected' : ''}
        onClick={() => {
          switchFilter(name)
        }}
      >
        {label}
      </button>
    </li>
  ))

  return (
    <footer className="footer">
      <span className="todo-count">
        {left}
        {' '}
        items left
      </span>
      <ul className='filters'>{buttons}</ul>
      <button type='button' className='clear-completed' onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}



Footer.defaultProps = {
  left: -1,
  filter: 'all',
  switchFilter: () => { },
  clearCompleted: () => { },
}
Footer.propTypes = {
  left: PropTypes.number,
  filter: PropTypes.string,
  switchFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}

/* eslint-disable prettier/prettier */

import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './todo-list-item.css'

export default function TodoListItem({ timeLeft, onTimerChange, id, editLabel, label, onDeleted, onToggleDone, done }) {
  const [created] = useState(new Date())
  const [timeToNow, setTimeToNow] = useState(formatDistanceToNow(new Date()))
  const [isEditing, setIsEditing] = useState(false)
  const [editedLabel, setEditedLabel] = useState('')
  const [isCounting, setIsCounting] = useState(false)

  let tickID
  let timerID
  let classNames = ''



  if (done) {
    classNames += 'completed'
  }
  if (isEditing) {
    classNames = 'editing'
  }


  useEffect(() => {
    if (isCounting) {
      timerID = setInterval(() => (onTimerChange(timeLeft - 1, id)), 1000)
    } if (!isCounting) {
      clearInterval(timerID)
    }
    return () => clearInterval(timerID)
  }, [isCounting, timeLeft])


  const switchEditing = () => {
    setIsEditing(!isEditing)
  }

  const setEditedValue = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      editLabel(editedLabel, id)
      switchEditing()
    }
  }

  const getPadTime = (time) => time.toString().padStart(2, '0')

  const onTimerSwitch = () => {
    setIsCounting(!isCounting)
  }

  const handleStop = () => {
    onTimerSwitch()
  }

  const handlePlay = () => {
    onTimerSwitch()
  }


  const tick = () => {
    setTimeToNow(formatDistanceToNow(created))
  }

  useEffect(() => {
    tickID = setInterval(() => tick(), 1000)
    return () => clearInterval(tickID)
  }, [])

  return (
    <li className={classNames}>
      <div className='view'>
        <input
          className='toggle'
          type='checkbox'
          onChange={onToggleDone}
          defaultChecked={done}
        />
        <label htmlFor='id'>
          <span className='title'>{label}</span>
          <span className='description'>
            {isCounting ? (
              <button
                type='button'
                aria-label="icon-pause"
                className="icon icon-pause"
                onClick={handleStop} />
            ) : (
              <button
                type='button'
                aria-label="icon-play"
                className="icon icon-play"
                onClick={handlePlay} />
            )}

            {`  ${getPadTime(Math.floor(timeLeft / 60))}:${getPadTime(timeLeft % 60)}`}
          </span>
          <span className='description'>
            Created {' '}
            {timeToNow}
            {' '}
            ago
          </span>
        </label>
        <button type='button' aria-label="edit" className='icon icon-edit' onClick={switchEditing} />
        <button type='button' aria-label='destroy' className='icon icon-destroy' onClick={onDeleted} />
      </div>
      <input
        type='text'
        className='edit'
        placeholder='Type new label'
        onChange={(e) => { setEditedLabel(e.target.value) }}
        onKeyDown={setEditedValue}
      />
    </li>
  )

}



TodoListItem.defaultProps = {
  label: 'undefiend',
  onDeleted: () => { },
  onToggleDone: () => { },
  done: false,
  editLabel: () => { }
}

TodoListItem.propTypes = {
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  editLabel: PropTypes.func
}

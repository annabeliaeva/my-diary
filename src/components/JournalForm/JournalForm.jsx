import Button from '../Button/Button'
import { useEffect, useReducer, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const { isFormValid, values, isFormReadyToSubmut } = formState

  useEffect(() => {
    let timeoutId
    if (!isFormValid.date || !isFormValid.header || !isFormValid.post) {
      timeoutId = setTimeout(() => {
        dispatchForm({ type: 'RESET_VALIDITY' })
      }, 2000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isFormValid])

  useEffect(() => {
    if (isFormReadyToSubmut) {
      onSubmit(values)
      dispatchForm({ type: 'CLEAR_FIELD' })
    }
  }, [isFormReadyToSubmut, values, onSubmit])

  const addJournalItem = (e) => {
    e.preventDefault()
    dispatchForm({ type: 'SUBMIT' })
  }

  const handleChange = (e) => {
    dispatchForm({
      type: 'SET_FIELD',
      field: e.target.name,
      value: e.target.value
    })
  }

  return (
    <form className={style.journal_form} onSubmit={addJournalItem}>
      <input
        type="text"
        name="header"
        value={values.header}
        onChange={handleChange}
        className={cn(style.input, style.header, {
          [style.invalid]: !isFormValid.header
        })}
      />
      <div className={style.form_row}>
        <label htmlFor="date" className={style.form_label}>
          <img src="/date.svg" alt="date" />
          <p>Дата</p>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={values.date}
          onChange={handleChange}
          className={cn(style.input, style.input, {
            [style.invalid]: !isFormValid.date
          })}
        />
      </div>
      <div className={style.form_row}>
        <label htmlFor="tag" className={style.form_label}>
          <img src="/tag.svg" alt="tag" />
          <p>Метки</p>
        </label>
        <input
          type="text"
          id="tag"
          className={style.input}
          value={values.tag}
          onChange={handleChange}
          name="tag"
        />
      </div>
      <textarea
        name="post"
        cols="30"
        rows="10"
        value={values.post}
        onChange={handleChange}
        className={cn(style.input, style.post, {
          [style.invalid]: !isFormValid.post
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm

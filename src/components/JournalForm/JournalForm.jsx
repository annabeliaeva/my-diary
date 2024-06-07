import Button from '../Button/Button'
import { useEffect, useReducer, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'

// const INITIAL_FORM_STATE = {
//   header: true,
//   date: true,
//   post: true
// }

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
    if (isFormReadyToSubmut) onSubmit(values)
  }, [isFormReadyToSubmut])

  const addJournalItem = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    dispatchForm({ type: 'SUBMIT', payload: formProps })
  }

  return (
    <form className={style.journal_form} onSubmit={addJournalItem}>
      <input
        type="text"
        name="header"
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
        <input type="text" id="tag" className={style.input} name="tag" />
      </div>
      <textarea
        name="post"
        cols="30"
        rows="10"
        className={cn(style.input, style.post, {
          [style.invalid]: !isFormValid.post
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm

import Button from '../Button/Button'
import { isValidElement, useEffect, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'

const INITIAL_FORM_STATE = {
  header: true,
  date: true,
  post: true
}

function JournalForm({ onSubmit }) {
  const [isFormValid, setIsFormValid] = useState(INITIAL_FORM_STATE)

  useEffect(() => {
    let timeoutId
    if (!isFormValid.date || !isFormValid.header || !isFormValid.post) {
      timeoutId = setTimeout(() => {
        setIsFormValid(INITIAL_FORM_STATE)
      }, 2000)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [isFormValid])

  const addJournalItem = (e) => {
    let isValid = true
    e.preventDefault()
    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    if (!formProps.header.trim().length) {
      setIsFormValid((prev) => ({ ...prev, header: false }))
      isValid = false
    } else {
      setIsFormValid((prev) => ({ ...prev, header: true }))
    }
    if (!formProps.post.trim().length) {
      setIsFormValid((prev) => ({ ...prev, post: false }))
      isValid = false
    } else {
      setIsFormValid((prev) => ({ ...prev, post: true }))
    }
    if (!formProps.date) {
      setIsFormValid((prev) => ({ ...prev, date: false }))
      isValid = false
    } else {
      setIsFormValid((prev) => ({ ...prev, date: true }))
    }
    if (!isValid) return
    onSubmit(formProps)
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

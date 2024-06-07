import Button from '../Button/Button'
import { isValidElement, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'

function JournalForm({ onSubmit }) {
  const [isFormValid, setIsFormValid] = useState({
    header: true,
    date: true,
    post: true
  })
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
        className={cn(style.input, {
          [style.invalid]: !isFormValid.header
        })}
      />
      <input
        type="date"
        name="date"
        className={`input ${isFormValid.date ? '' : style.invalid}`}
      />
      <input type="text" name="tag" />
      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={` ${isFormValid.post ? '' : style.invalid}`}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm

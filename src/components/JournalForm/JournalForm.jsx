import Button from '../Button/Button'
import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'
import { getFormattedDate } from '../../../utils'

function JournalForm({ onSubmit, item }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const { isFormValid, values, isFormReadyToSubmut } = formState

  const { userId } = useContext(UserContext)

  const titleRef = useRef()
  const dateRef = useRef()
  const postRef = useRef()

  const focusError = (isFormValid) => {
    switch (true) {
      case !isFormValid.title:
        titleRef.current.focus()
        break
      case !isFormValid.date:
        dateRef.current.focus()
        break
      case !isFormValid.post:
        postRef.current.focus()
        break
    }
  }
  useEffect(() => {
    let timeoutId
    focusError(isFormValid)
    if (!isFormValid.date || !isFormValid.title || !isFormValid.post) {
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

  useEffect(() => {
    dispatchForm({
      type: 'SET_FIELD',
      field: 'userId',
      value: userId
    })
  }, [userId])

  useEffect(() => {
    if (item) {
      dispatchForm({
        type: 'UPDATE_FORM',
        title: item.title,
        date: getFormattedDate(item.date),
        post: item.post,
        tag: item.tag
      })
    } else {
      dispatchForm({ type: 'CLEAR_FIELD' })
    }
  }, [item])

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
      <Input
        type="text"
        name="title"
        ref={titleRef}
        value={values.title}
        onChange={handleChange}
        appearance="header"
        isValid={isFormValid.title}
      />
      <div className={style.form_row}>
        <label htmlFor="date" className={style.form_label}>
          <img src="/date.svg" alt="date" />
          <p>Дата</p>
        </label>
        <Input
          type="date"
          id="date"
          name="date"
          ref={dateRef}
          value={values.date}
          onChange={handleChange}
          isValid={isFormValid.date}
        />
      </div>
      <div className={style.form_row}>
        <label htmlFor="tag" className={style.form_label}>
          <img src="/tag.svg" alt="tag" />
          <p>Метки</p>
        </label>
        <Input
          type="text"
          id="tag"
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
        ref={postRef}
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

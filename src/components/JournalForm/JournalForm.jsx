import Button from '../Button/Button'
import { useContext, useEffect, useReducer, useRef, useState } from 'react'
import style from './JournalForm.module.css'
import cn from 'classnames'
import { INITIAL_STATE, formReducer } from './JournalForm.state'
import Input from '../Input/Input'
import { UserContext } from '../../context/user.context'

function JournalForm({ onSubmit, onClickDelete, data }) {
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
      console.log(formState)
      onSubmit(values)
      dispatchForm({ type: 'CLEAR_FIELD' })
      dispatchForm({ type: 'SET_FIELD', payload: { userId } })
    }
  }, [isFormReadyToSubmut, values, onSubmit, userId])

  useEffect(() => {
    dispatchForm({ type: 'CLEAR_FIELD' })
    dispatchForm({ type: 'SET_FIELD', payload: { userId } })
  }, [userId])

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: 'CLEAR_FIELD' })
      dispatchForm({ type: 'SET_FIELD', payload: { userId } })
    }
    dispatchForm({ type: 'SET_FIELD', payload: { ...data } })
  }, [data])

  const addJournalItem = (e) => {
    e.preventDefault()
    dispatchForm({ type: 'SUBMIT' })
  }

  const handleChange = (e) => {
    dispatchForm({
      type: 'SET_FIELD',
      payload: { [e.target.name]: e.target.value }
    })
  }

  const deleteJournalItem = () => {
    onClickDelete(data.id)
    dispatchForm({ type: 'CLEAR_FIELD' })
    dispatchForm({ type: 'SET_FIELD', payload: { userId } })
  }

  return (
    <form className={style.journal_form} onSubmit={addJournalItem}>
      <div className={style.header}>
        <Input
          type="text"
          name="title"
          ref={titleRef}
          value={values.title}
          onChange={handleChange}
          appearance="header"
          isValid={isFormValid.title}
        />
        {data?.id && (
          <img
            className={style.img_delete}
            src="/delete.svg"
            alt="Удалить запись"
            onClick={deleteJournalItem}
          />
        )}
      </div>
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
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ''
          }
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

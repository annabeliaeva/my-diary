import './JournalList.css'
import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import { useContext } from 'react'
import { UserContext } from '../../context/user.context'

function JournalList({ items, setItem }) {
  if (items.length === 0) {
    return <p>Записей пока нет, добавьте первую</p>
  }
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }

  const { userId } = useContext(UserContext)

  return (
    <>
      {items
        .sort(sortItems)
        .filter((el) => el.userId === userId)
        .map((el) => (
          <CardButton key={el.id} onClick={() => setItem(el)}>
            <JournalItem title={el.title} post={el.post} date={el.date} />
          </CardButton>
        ))}
    </>
  )
}

export default JournalList

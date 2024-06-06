import CardButton from '../CardButton/CardButton'
import './JournalAddButton.css'

function JournalAddButton() {
  return (
    <>
      <CardButton className="journal-add">
        <img src="/plus.svg" alt="Add memory" />
        Новое воспоминание
      </CardButton>
    </>
  )
}

export default JournalAddButton

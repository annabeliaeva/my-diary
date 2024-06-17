import CardButton from '../CardButton/CardButton'
import './JournalAddButton.css'

function JournalAddButton({ onClickJournalAddButton }) {
  return (
    <>
      <CardButton className="journal-add" onClick={onClickJournalAddButton}>
        <img src="/plus.svg" alt="Add memory" />
        Новое воспоминание
      </CardButton>
    </>
  )
}

export default JournalAddButton

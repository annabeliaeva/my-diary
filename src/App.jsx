import './App.css'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/useLocalStorage.hook'
import { UserContextProvider } from './context/user.context'
import { useState } from 'react'

function App() {
  const [items, setItems] = useLocalStorage('data')

  const [chosenCard, setChosenCard] = useState(null)

  const mapItems = (items) => {
    if (!items) return []
    return items.map((i) => ({
      ...i,
      date: new Date(i.date)
    }))
  }

  const addItem = (item) => {
    setItems([
      ...mapItems(items),
      {
        ...item,
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        date: new Date(item.date)
      }
    ])
  }

  const handleClickCardButton = (el) => {
    setChosenCard(el)
  }

  const handleJournalAddButton = () => {
    setChosenCard(null)
  }

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton onClickJournalAddButton={handleJournalAddButton} />
          <JournalList
            items={mapItems(items)}
            handleClickCardButton={handleClickCardButton}
          />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} item={chosenCard} />
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App

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

  const [selectedItem, setSelectedItem] = useState(null)

  const mapItems = (items) => {
    if (!items) return []
    return items.map((i) => ({
      ...i,
      date: new Date(i.date)
    }))
  }

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          ...item,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1
        }
      ])
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return {
              ...item
            }
          }
          return i
        })
      ])
    }
  }

  const handleClickCardButton = (el) => {
    setSelectedItem(el)
  }

  const handleJournalAddButton = () => {
    setSelectedItem(null)
  }

  const handleClickDelete = (id) => {
    setItems([...items.filter((i) => i.id !== id)])
  }

  return (
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton onClickJournalAddButton={handleJournalAddButton} />
          <JournalList
            items={mapItems(items)}
            setItem={handleClickCardButton}
          />
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            onClickDelete={handleClickDelete}
            data={selectedItem}
          />
        </Body>
      </div>
    </UserContextProvider>
  )
}

export default App

import './App.css'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/useLocalStorage.hook'
import { UserContext } from './context/user.context'
import { useState } from 'react'

function App() {
  const [items, setItems] = useLocalStorage('data')
  const [userId, setUserId] = useState(1)

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
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        title: item.header,
        text: item.post,
        date: new Date(item.date)
      }
    ])
  }

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton />
          <JournalList items={mapItems(items)} />
        </LeftPanel>
        <Body>
          <JournalForm onSubmit={addItem} />
        </Body>
      </div>
    </UserContext.Provider>
  )
}

export default App

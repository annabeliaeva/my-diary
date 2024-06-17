import './App.css'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useLocalStorage } from './hooks/useLocalStorage.hook'
import { UserContextProvider } from './context/user.context'

function App() {
  const [items, setItems] = useLocalStorage('data')

  const mapItems = (items) => {
    if (!items) return []
    return items.map((i) => ({
      ...i,
      date: new Date(i.date)
    }))
  }

  const addItem = (item) => {
    console.log(item)
    setItems([
      ...mapItems(items),
      {
        ...item,
        id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        date: new Date(item.date)
      }
    ])
  }

  return (
    <UserContextProvider>
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
    </UserContextProvider>
  )
}

export default App

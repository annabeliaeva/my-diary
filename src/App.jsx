import './App.css'
import Button from './components/Button/Button'
import CardButton from './components/CardButton/CardButton'
import JournalItem from './components/JournalItem/JournalItem'
import JournalList from './components/JournalList/JournalList'
import Body from './layouts/Body/Body'
import LeftPanel from './layouts/LeftPanel/LeftPanel'
import Header from './components/Header/Header'
import JournalAddButton from './components/JournalAddButton/JournalAddButton'
import JournalForm from './components/JournalForm/JournalForm'
import { useState } from 'react'

function App() {
  // const INITIAL_DATA = [
  //   {
  //     id: 1,
  //     title: 'Хороший денек',
  //     text: 'Прекрасный выдался день для прогулки',
  //     date: new Date()
  //   },
  //   {
  //     id: 2,
  //     title: 'Плохой денек',
  //     text: 'Ужасный выдался день для прогулки',
  //     date: new Date()
  //   }
  // ]

  const [items, setItems] = useState([])

  const addItem = (item) => {
    setItems((oldItems) => [
      ...items,
      {
        id: oldItems.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        title: item.header,
        text: item.post,
        date: new Date(item.date)
      }
    ])
    console.log(items)
  }

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  )
}

export default App

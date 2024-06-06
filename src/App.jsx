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
  const INITIAL_DATA = [
    {
      title: 'Хороший денек',
      text: 'Прекрасный выдался день для прогулки',
      date: new Date()
    },
    {
      title: 'Плохой денек',
      text: 'Ужасный выдался день для прогулки',
      date: new Date()
    }
  ]

  const [items, setItems] = useState(INITIAL_DATA)

  const addItem = (item) => {
    setItems((items) => [
      ...items,
      {
        title: item.header,
        text: item.post,
        date: new Date(item.date)
      }
    ])
  }

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList>
          {items.map((e) => (
            <CardButton key={e.title + e.text}>
              <JournalItem title={e.title} text={e.text} date={e.date} />
            </CardButton>
          ))}
        </JournalList>
      </LeftPanel>
      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>
    </div>
  )
}

export default App

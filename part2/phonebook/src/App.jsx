import { useState, useEffect } from 'react'
import Heading from './components/Heading'
import Filter from './components/Filter'
import Form from './components/Form'
import PersonList from './components/PersonList'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phone, setPhone] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const eventHandler = (personList) => {
      const dataFromServer = personList
      setPersons(dataFromServer)
    }
    phonebookService.getAll().then(eventHandler)
  }, [])

  const filterPersonsByName = persons.filter((person) =>
    person.name.toLowerCase().includes(filter),
  )
  const filteredList = filter ? filterPersonsByName : persons

  const formValues = {
    persons,
    newName,
    phone,
    onNewName: setNewName,
    onPhone: setPhone,
    onPersons: setPersons,
  }

  return (
    <div>
      <Heading />
      <Filter filter={filter} onChangeFilter={setFilter} />
      <Form formValues={formValues} />
      <PersonList filteredList={filteredList} />
    </div>
  )
}

export default App

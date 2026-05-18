import { useRef } from 'react'
import phonebookService from '../services/phonebook'

const Form = ({ formValues }) => {
  const { persons, onNewName, onPhone, onPersons, phone, newName } = formValues
  const inputRef = useRef(null)
  const handleInputChange = (event) => onNewName(event.target.value)
  const handlePhoneChange = (event) => onPhone(event.target.value)

  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, phone: phone }
    const findPerson = persons.find((person) => person.name === newPerson.name)

    if (!findPerson) {
      phonebookService.create(newPerson).then((returnedObj) => {
        onPersons(persons.concat(returnedObj))
        onNewName('')
        onPhone('')
        inputRef.current.focus()
      })
    } else {
      alert(`${newPerson.name} is already added to the phonebook`)
      onNewName('')
      onPhone('')
    }
  }

  return (
    <div>
      <form onSubmit={handleAddPerson}>
        <h2>add a new</h2>
        <div>
          name:{' '}
          <input ref={inputRef} value={newName} onChange={handleInputChange} />
        </div>
        <div>
          number: <input value={phone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

export default Form

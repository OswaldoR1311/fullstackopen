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

    const handleCleanInputs = () => {
      onNewName('')
      onPhone('')
      inputRef.current.focus()
    }

    if (!findPerson) {
      phonebookService.create(newPerson).then((returnedObj) => {
        onPersons(persons.concat(returnedObj))
        handleCleanInputs()
      })
    } else {
      if (
        confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`,
        )
      ) {
        const changedObject = { ...findPerson, phone: phone }
        const eventHandler = (returnedObject) => {
          onPersons(
            persons.map((person) =>
              person.id === findPerson.id ? returnedObject : person,
            ),
          )
        }
        phonebookService.update(findPerson.id, changedObject).then(eventHandler)
        handleCleanInputs()
      } else {
        handleCleanInputs()
      }
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

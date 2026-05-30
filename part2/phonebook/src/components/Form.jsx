import { useRef } from 'react'
import phonebookService from '../services/phonebook'
import { notificationOptions, notificationStatusOptions } from '../constants'

const Form = ({ formValues, message, status, onMessage, onStatus }) => {
  const { persons, onNewName, onPhone, onPersons, phone, newName } = formValues
  const inputRef = useRef(null)
  const handleInputChange = event => onNewName(event.target.value)
  const handlePhoneChange = event => onPhone(event.target.value)

  const handleAddPerson = event => {
    event.preventDefault()
    const newPerson = { name: newName, number: phone }
    const findPerson = persons.find(person => person.name === newPerson.name)

    const handleCleanInputs = () => {
      onNewName('')
      onPhone('')
      inputRef.current.focus()
    }

    if (!findPerson) {
      phonebookService
        .create(newPerson)
        .then(returnedObj => {
          onPersons(persons.concat(returnedObj))
          handleCleanInputs()
        })
        .catch(error => {
          console.log(error.response.data.error)
        })
      onMessage(`${newPerson.name} ${notificationOptions.addSuccess}`)
      onStatus(notificationStatusOptions.success)
      setTimeout(() => {
        onMessage(null)
        onStatus(null)
      }, 3000)
    } else {
      if (
        confirm(
          `${newPerson.name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const changedObject = { ...findPerson, phone: phone }
        const eventHandler = returnedObject => {
          onPersons(
            persons.map(person =>
              person.id === findPerson.id ? returnedObject : person
            )
          )
        }

        const errorHandler = () => {
          console.log('negativo')
          onMessage(`${findPerson.name} ${notificationOptions.editFail}`)
          onStatus(notificationStatusOptions.error)
          setTimeout(() => {
            onMessage(null)
            onStatus(null)
          }, 3000)
        }
        phonebookService
          .update(findPerson.id, changedObject)
          .then(eventHandler)
          .catch(errorHandler)
        onMessage(`${findPerson.name} ${notificationOptions.editSuccess}`)
        onStatus(notificationStatusOptions.success)
        setTimeout(() => {
          onMessage(null)
          onStatus(null)
        }, 3000)
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

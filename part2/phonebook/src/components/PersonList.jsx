const PersonList = ({ filteredList, onDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} {person.phone}
            <button onClick={() => onDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PersonList

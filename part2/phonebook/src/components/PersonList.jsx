const PersonList = ({ filteredList }) => {
  return (
    <>
      <h2>Numbers</h2>
      <ul>
        {filteredList.map((person, index) => (
          <li key={index}>
            {person.name} {person.phone}
          </li>
        ))}
      </ul>
    </>
  )
}

export default PersonList

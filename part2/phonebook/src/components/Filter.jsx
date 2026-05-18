const Filter = ({ filter, onChangeFilter }) => {
  const handleFilterChange = (event) => onChangeFilter(event.target.value)
  return (
    <div>
      Filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter

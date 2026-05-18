const Total = ({ parts }) => {
  const total = parts.reduce((acum, currentValue) => {
    return acum + currentValue.exercises
  }, 0)
  return <strong>total of {total} exercises</strong>
}

export default Total

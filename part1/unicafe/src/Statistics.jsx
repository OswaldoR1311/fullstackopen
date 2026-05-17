import Topic from './Topic'

const Statistics = ({ good, neutral, bad }) => {
  const options = [
    {
      name: 'good',
      value: good,
      num: 1,
    },
    {
      name: 'neutral',
      value: neutral,
      num: 0,
    },
    {
      name: 'bad',
      value: bad,
      num: -1,
    },
  ]

  const totalFeedback = () => {
    return options.reduce((acum, currentValue) => {
      return acum + currentValue.value
    }, 0)
  }

  const calculateAverage = () => {
    const total = totalFeedback()

    if (total === 0) {
      return 0
    }
    const pondValue = options.reduce((acum, { value, num }) => {
      acum += value * num
      return acum
    }, 0)
    return pondValue / total
  }

  const calculatePositive = () => {
    return (options[0].value * 100) / totalFeedback()
  }

  return (
    <div>
      {totalFeedback() === 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <>
          <h2>Statistics</h2>
          {options.map(({ name, value }) => (
            <Topic label={name} value={value} key={name} />
          ))}
          <p>all {totalFeedback()}</p>
          <p>average {calculateAverage()}</p>
          <p>positive {calculatePositive()}%</p>
        </>
      )}
    </div>
  )
}

export default Statistics

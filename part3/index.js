const express = require('express')
const app = express()

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  //   {
  //     id: '4',
  //     name: 'Mary Poppendieck',
  //     number: '39-23-6423122',
  //   },
]

app.use(express.json())

app.get('/api/persons', (req, res) => {
  res.status(200).json(persons)
})

app.get('/info', (req, res) => {
  const date = new Date()
  const html = `<p>Phonebook has info for ${persons.length} people</p>
        <p>${date.toString()}</p>
    `
  res.send(html)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const findPerson = persons.find((person) => person.id === id)
  if (findPerson) {
    return res.json(findPerson)
  } else {
    return res
      .status(400)
      .json({ error: 'Entry does not exist in the phonebook' })
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

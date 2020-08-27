import React, { useState } from 'react'

const App = () => {
  const [railsQuery, setRailsQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState([])
  const handleChange = (event) => {
    setRailsQuery(event.target.value)
  }

  const submitRailsQuery = async () => {
    setIsLoading(true)
    const searchString = `http://localhost:3000/clue_queries?query_string=${railsQuery}`
    try {
      const response = await fetch(searchString)
      const result = await response.json()
      setResults(result.data)
    } catch (err) {
      console.error(err)
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <input type='search' value={railsQuery} onChange={handleChange} />
      <button onClick={submitRailsQuery}>Submit</button>
      { isLoading &&
        <span>Loading...</span>
      }
      { error &&
        <span>An error occurred: {error}</span>
      }
      <ul>
        { Array.isArray(results) && results.length > 0 && results.map((result, index) => {
            return (<li key={`result-${index}`}>{result.attributes.name}</li>)
          })
        }
        { !Array.isArray(results) && Object.keys(results).length > 0 &&
          <li>{results.attributes.name}</li>
        }
      </ul>
    </div>
  );
}

export default App

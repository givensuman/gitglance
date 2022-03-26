import { useState } from 'react'
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import Profile from './views/Profile'
import Search from './views/Search'

function App() {

  const [ error, setError ] = useState(200)
  const handleError = (value: number) => setError(value)

  return (
    <div className='App'>
      <Router>

      <Routes>
        <Route path='/*' element={<Profile handleError={handleError} />} />
        <Route path='/' element={<Search error={error} />} />
      </Routes>

      </Router>
    </div>
  )
}

export default App

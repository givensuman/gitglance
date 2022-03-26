import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'

import Profile from './views/Profile'
import Search from './views/Search'

function App() {

  return (
    <div className='App'>
      <Router>

      <Routes>
        <Route path='/*' element={<Profile />} />
        <Route path='/' element={<Search />} />
      </Routes>

      </Router>
    </div>
  )
}

export default App

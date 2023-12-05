import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import { useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }
  
  return (
    <div className={`app ${darkMode ? 'dark' : ''}`} >
      <Header toggleDarkMode={toggleDarkMode} />
      <Main darkMode={darkMode} />
      <Footer />
    </div>
  )
}

export default App

import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"
import { useState } from "react"

function App() {
  //const theme = localStorage.getItem('theme')
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => {
    // if (!darkMode) {
    //   localStorage.setItem('dark-theme', "true")
    // } else {
    //   localStorage.removeItem('theme')
    // }
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

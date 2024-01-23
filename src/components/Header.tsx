import themeIcon from '../assets/theme-icon.svg'
import bookIcon from '../assets/books.svg'
import { Props } from '../types/types'

const Header = (props: Props) => {
  return (
    <header>
      <div className="header-info">
        <div>
          <div className='header-title'>
            <img 
              src={bookIcon} 
              alt="Stack of books" 
              className='header-icon'
              />
            <h1>Trivia</h1>
          </div>
          <p>✨ Test your video game knowledge</p>
        </div>

        <button 
          className='header-toggleTheme'
          onClick={props.toggleDarkMode}
        >
          <img src={themeIcon} alt="theme icon" />
        </button>
      </div>
    </header>
  )
}

export default Header
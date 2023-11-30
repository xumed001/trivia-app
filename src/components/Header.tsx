import themeIcon from '../assets/theme-icon.svg'


const Header = () => {
  return (
    <header>
      <div className="header-info">
        <div>
          <h1>Trivia</h1>
          <p>Test your general knowledge</p>
        </div>
        <button>
          <img src={themeIcon} alt="theme icon" />
        </button>
      </div>
    </header>
  )
}

export default Header
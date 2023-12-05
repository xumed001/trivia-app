import githubIcon from '../assets/github-icon.svg'

const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <img src={githubIcon} alt="Github icon" />
        <a 
          className="footer-link1" 
          href='https://github.com/xumed001/trivia-app'
          target="_blank"
        >GitHub</a>
      </div>
    </footer>
  )
}

export default Footer
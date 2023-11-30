import githubIcon from '../assets/github-icon.svg'

const Footer = () => {
  return (
    <footer>
      <div className="footer-info">
        <img src={githubIcon} alt="Github icon" />
        <p>GitHub</p>
      </div>
    </footer>
  )
}

export default Footer
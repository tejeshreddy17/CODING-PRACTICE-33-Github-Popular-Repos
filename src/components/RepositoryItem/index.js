// Write your code here

import './index.css'

const RepositoryItem = props => {
  const {eachDetail} = props
  const {avatarUrl, forksCount, id, issuesCount, name, starsCount} = eachDetail
  return (
    <li className="item-card">
      <img alt={name} className="image-style" src={avatarUrl} />
      <h1 className="repository-heading">{name}</h1>
      <div className="image-container">
        <img
          className="image-font-style"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
        />
        <p>{starsCount} Stars</p>
      </div>
      <div className="image-container">
        <img
          className="image-font-style"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p>{forksCount} fans</p>
      </div>
      <div className="image-container">
        <img
          className="image-font-style"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
        />
        <p>{issuesCount}open Issues</p>
      </div>
    </li>
  )
}
export default RepositoryItem

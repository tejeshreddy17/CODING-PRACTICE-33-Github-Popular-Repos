// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {eachtab, updatingActiveTab, isactive} = props
  const {id, language} = eachtab
  const clickingTab = () => {
    updatingActiveTab(id)
  }

  return (
    <button
      type="button"
      onClick={clickingTab}
      className={isactive ? 'tabItem active-tab' : 'tabItem'}
    >
      {language}
    </button>
  )
}
export default LanguageFilterItem

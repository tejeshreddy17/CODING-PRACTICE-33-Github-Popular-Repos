import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './index.css'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatusObject = {
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    popularhubslist: [],
    activeTab: languageFiltersData[0].id,
    apistatus: apiStatusObject.initial,
  }

  componentDidMount() {
    this.gettingProducts()
  }

  gettingProducts = async () => {
    this.setState({apistatus: apiStatusObject.inprogress})
    const {activeTab} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTab}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const formatedData = data.popular_repos.map(eachdetail => ({
        avatarUrl: eachdetail.avatar_url,
        forksCount: eachdetail.forks_count,
        id: eachdetail.id,
        issuesCount: eachdetail.issues_count,
        name: eachdetail.name,
        starsCount: eachdetail.stars_count,
      }))
      this.setState({
        popularhubslist: formatedData,
        apistatus: apiStatusObject.success,
      })
    } else {
      this.setState({apistatus: apiStatusObject.failure})
    }
  }

  updatingActiveTab = id => {
    this.setState({activeTab: id}, this.gettingProducts)
  }

  renderHubsview = () => {
    const {apistatus, popularhubslist} = this.state
    switch (apistatus) {
      case 'SUCCESS':
        return (
          <ul className="hubs-container">
            {popularhubslist.map(eachDetail => (
              <RepositoryItem eachDetail={eachDetail} key={eachDetail.id} />
            ))}
          </ul>
        )
      case 'FAILURE':
        return (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
          </div>
        )
      case 'INPROGRESS':
        return (
          <div testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    const {activeTab} = this.state
    return (
      <div className="background-card">
        <h1 className="heading-style">Popular</h1>
        <ul>
          {languageFiltersData.map(eachfilter => (
            <LanguageFilterItem
              updatingActiveTab={this.updatingActiveTab}
              eachtab={eachfilter}
              isactive={activeTab === eachfilter.id}
              key={eachfilter.id}
            />
          ))}
        </ul>
        {this.renderHubsview()}
      </div>
    )
  }
}

export default GithubPopularRepos

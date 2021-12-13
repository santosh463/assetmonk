// Write your code here.
import {Component} from 'react'
import './index.css'

const PLUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-plus-icon-img.png'
const MINUS_IMAGE =
  'https://assets.ccbp.in/frontend/react-js/faqs-minus-icon-img.png'

class PostList extends Component {
  state = {
    isActive: false,
    commentsData: {},
  }

  componentDidMount() {
    this.getCommentData()
  }

  getCommentData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments',
    )
    const data = await response.json()

    const updatedData = {
      postId: data.post_id,
      id: data.id,
      name: data.name,
      email: data.email,
      body: data.body,
    }
    this.setState({commentsData: updatedData})
  }

  renderAnswer = () => {
    const {isActive, commentsData} = this.state
    const {body} = commentsData

    if (isActive) {
      return (
        <div>
          <hr className="line" />
          <p className="answer">{body}</p>
        </div>
      )
    }
    return null
  }

  onToggleAnswer = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  renderActiveImage = () => {
    const {isActive} = this.state
    const image = isActive ? MINUS_IMAGE : PLUS_IMAGE
    const altText = isActive ? 'minus' : 'plus'

    return (
      <button className="button" type="button" onClick={this.onToggleAnswer}>
        <img className="image" src={image} alt={altText} />
      </button>
    )
  }

  render() {
    const {postDetails} = this.props
    const {title} = postDetails

    return (
      <li className="post-item">
        <div className="question-container">
          <h1 className="question">{title}</h1>
          {this.renderActiveImage()}
        </div>
        {this.renderAnswer()}
      </li>
    )
  }
}

export default PostList

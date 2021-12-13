import {Component} from 'react'
import Header from '../Header'
import PostsItem from '../PostsItem'

import './index.css'

class Posts extends Component {
  state = {postData: {}}

  componentDidMount() {
    this.getItemData()
  }

  getItemData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await response.json()

    const updatedData = {
      userId: data.user_id,
      id: data.id,
      title: data.title,
      body: data.body,
    }
    this.setState({postData: updatedData})
  }

  renderItemDetails = () => {
    const {postData} = this.state

    return (
      <>
        <Header />
        <PostsItem postData={postData} />
      </>
    )
  }

  render() {
    return <div className="container">{this.renderItemDetails()}</div>
  }
}

export default Posts

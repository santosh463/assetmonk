import PostList from '../PostList'
import './index.css'

const PostsItem = props => {
  const {postData} = props

  return (
    <div className="bg-container">
      <div className="posts-container">
        <ul className="posts-list">
          {postData.map(each => (
            <PostList postDetails={each.title} key={each.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PostsItem

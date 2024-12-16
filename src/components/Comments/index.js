import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    userName: '',
    comment: '',
    index: 0,
    commentList: [],
  }

  onChangeName = event => {
    this.setState({
      userName: event.target.value,
    })
  }

  onChangeComment = event => {
    this.setState({
      comment: event.target.value,
    })
  }

  addComment = event => {
    event.preventDefault()
    const {userName, comment, index} = this.state
    if (index > initialContainerBackgroundClassNames.length - 2) {
      this.setState({index: 0})
    } else {
      this.setState(preState => ({
        index: preState.index + 1,
      }))
    }
    const newComment = {
      id: uuidv4(),
      userName,
      comment,
      profileBgColors: initialContainerBackgroundClassNames[index],
      isLiked: false,
    }
    this.setState(preState => ({
      commentList: [...preState.commentList, newComment],
      userName: '',
      comment: '',
    }))
  }

  onDelete = commentId => {
    const {commentList} = this.state
    const filteredListAfterDelete = commentList.filter(
      item => item.id !== commentId,
    )
    this.setState({
      commentList: filteredListAfterDelete,
    })
  }

  onLike = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(comment =>
        comment.id === id ? {...comment, isLiked: !comment.isLiked} : comment,
      ),
    }))
  }

  render() {
    const {commentList, userName, comment} = this.state
    const {isLiked} = commentList
    const commentCount = commentList.length
    return (
      <div className="outer-container">
        <div className="container">
          <div className="left-container">
            <h1 className="heading">Comments</h1>
            <p>Say something about 4.0 Technologies</p>
            <form onSubmit={this.addComment}>
              <input
                value={userName}
                onChange={this.onChangeName}
                placeholder="Your Name"
              />
              <textarea
                value={comment}
                onChange={this.onChangeComment}
                placeholder="Your Comment"
              />
              <button type="submit">Add Comment</button>
            </form>
          </div>
          <div className="right-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <div className="comment-count">
          <p className="count">{commentCount}</p>
          <p>Comments</p>
        </div>
        <ul className="comment-container">
          {commentList.map(item => (
            <CommentItem
              key={item.id}
              commentDetails={item}
              commentCount={commentCount}
              profileBgColors={item.profileBgColors}
              onDelete={this.onDelete}
              onLiked={this.onLike}
              isLike={isLiked}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

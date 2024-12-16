import {Component} from 'react'
import './index.css'

class CommentItem extends Component {
  render() {
    const {commentDetails, profileBgColors, onDelete, onLiked, isLiked} =
      this.props
    const {userName, comment, id} = commentDetails
    const onClickHandle = () => {
      onDelete(id)
    }
    const likeHandle = () => {
      onLiked(id)
    }
    const likeImg = isLiked
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    const deleteImg =
      'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png'

    return (
      <li>
        <div className="content-container">
          <div>
            <p className={`profile ${profileBgColors}`}>
              {userName[0].toUpperCase()}
            </p>
          </div>
          <div className="comment-container">
            <div className="user-name-conatiner">
              <p className="user-name">{userName}</p>
              <p className="less-minute">less than a minute ago</p>
            </div>
            <div>
              <p className="comment">{comment}</p>
            </div>
          </div>
        </div>
        <div className="like-delete-container">
          <div className="like-container">
            <img src={likeImg} alt="like" />
            <button type="button" onClick={likeHandle}>
              Like
            </button>
          </div>
          <div>
            <button className="delete-icon" type="button" data-testid="delete">
              <img src={deleteImg} alt="delete" onClick={onClickHandle} />
            </button>
          </div>
        </div>
        <hr />
      </li>
    )
  }
}

export default CommentItem

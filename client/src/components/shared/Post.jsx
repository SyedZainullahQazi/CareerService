// "userId": 1,
// "id": 1,
// "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
// "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"

import React from 'react'
import PostCss from '../../styles/shared/Post.module.css';
import Button from './Button';

function Post(props) {

  return (
    <div className={`${PostCss.dark}`}>
        <div className={`${PostCss.post_card}`}>
            <div>
                <p className={`${PostCss.post_title}`}>{props.title}</p>
            </div>
            <div className={`${PostCss.post_body}`}>
                <p >{props.body}</p>
            </div>
            <div className={`d-flex flex justify-content-between`}>
                <p className={`${PostCss.post_body_left}`}>POST-ID{" "}:{" "}{props.id}</p>
                <p className={`${PostCss.post_body_middle}`}>POST-BY{" "}:{" "}{props.userId}</p>
                <p className={`${PostCss.post_body_right}`}>POST-TYPE{" "}:{" "}{props.postType}</p>

            </div>
            <div>
                <Button/>
            </div>
        </div>
    </div>
  )
}

export default Post
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { httpClient } from "../../httpClient/httpServices";
import { PostModel } from "../../Models/PostModel";
import { UserModel } from "../../Models/UserModel";

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Post.css";

interface PostProps {
  post: PostModel;
  onDeleteClick: (id: number) => void;
}

const Post = ({ post, onDeleteClick }: PostProps) => {
  const [user, setUser] = useState({} as UserModel);
  useEffect(() => {
    httpClient()
      .get("https://reqres.in/api/users")
      .then((res) => {
        res.data.data.map((user: UserModel) => {
          if (post.userId === user.id) setUser(user);
        });
      });
  }, []);
  return (
    <div className="post-wrapper">
      <img className="post-avatar" alt={post.id.toString()} src={user.avatar} />
      <div className="post-right-content">
        <div>
          <span className="author">
            {user.first_name + " " + user.last_name}
          </span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="delete"
            onClick={() => onDeleteClick(post.id)}
          />
        </div>
        <span className="title">{post.title}</span>
        <span className="post-body">{post.body}</span>
      </div>
    </div>
  );
};

export default Post;

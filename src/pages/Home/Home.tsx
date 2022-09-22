import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Modal from "../../Components/Modal/Modal";

import Post from "../../Components/Post/Post";
import { httpClient } from "../../httpClient/httpServices";
import { PostModel } from "../../Models/PostModel";
import { UserModel } from "../../Models/UserModel";

import "./Home.css";

const Home = () => {
  const [postList, setPostList] = useState<PostModel[]>([]);

  const [userList, setUserList] = useState<UserModel[]>([]);

  const [postValue, setPostValue] = useState(0);

  const [isShowModel, setIsShowModel] = useState(false);

  const [postsLength, setPostsLength] = useState(10);

  const maxPostsLength = 50;

  const [loading, setLoading] = useState(false);

  const onShowModal = (id: number) => {
    setPostValue(id);
    setIsShowModel(true);
  };

  const onHideModal = () => {
    setIsShowModel(false);
    setPostValue(0);
  };

  const onDeletePost = () => {
    if (postValue !== 0) {
      httpClient()
        .delete("https://jsonplaceholder.typicode.com/posts/" + postValue)
        .then((res) => {
          setPostList((prev) => prev.filter((e) => e.id !== postValue));
        });
    }
    onHideModal();
  };

  const getData = () => {
    httpClient()
      .get(
        "https://jsonplaceholder.typicode.com/posts?_limit=" + maxPostsLength
      )
      .then((res) => {
        setPostList(res.data);
      });
  };

  const prevPostsLength = useRef(0);

  function handleScroll() {
    if (
      document.scrollingElement &&
      window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement?.scrollHeight &&
      postsLength < maxPostsLength
    ) {
      // Do load more content here!
      setLoading(true);
      setTimeout(() => {
        setPostsLength((prev) => prev + 10);
        setLoading(false);
      }, 1000);
      console.log(loading);
      window.removeEventListener("scroll", handleScroll);
    }
  }

  useEffect(() => {
    getData();
    httpClient()
      .get("https://reqres.in/api/users")
      .then((res) => {
        setUserList([...res.data.data]);
      });
    window.addEventListener("scroll", handleScroll);
    prevPostsLength.current = postsLength || 0;
    return () => window.removeEventListener("scroll", handleScroll);
  }, [postsLength]);
  return (
    <div>
      <Modal
        icon={faClose}
        title="Are you sure?"
        action="Delete"
        body="Do you realldy want to delete this recode, this progress can’t undo again"
        onAccept={onDeletePost}
        onCancel={onHideModal}
        isShow={isShowModel}
      />

      {userList.length > 0 &&
        postList.map((post: PostModel, index) => (
          <div key={index}>
            {index <= postsLength - 1 && (
              <Post
                key={post.id}
                onDeleteClick={() => {
                  onShowModal(post.id);
                }}
                post={post}
              ></Post>
            )}
          </div>
        ))}
      {!loading && <span>done</span>}
      {loading && (
        <span>
          Loading More...{" "}
          <FontAwesomeIcon className="loading" icon={faSpinner} />
        </span>
      )}
    </div>
  );
};

export default Home;

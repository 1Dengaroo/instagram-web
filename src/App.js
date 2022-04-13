import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./index.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Explore from "./components/Explore";
import Activity from "./components/Activity";
import NewPost from "./components/NewPost";
import React, { useState } from "react";
import initialStore from "./utils/initialStore";
import uniqueId from "./utils/uniqueId.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// To update github pages:
// run "git push origin master" in terminal

export default () => {
  const [page, setPage] = useState("home");
  const [currentUserId, setCurrentUserId] = useState(
    initialStore.currentUserId
  );
  const [users, setUsers] = useState(initialStore.users);
  const [posts, setPosts] = useState(initialStore.posts);
  const [followers, setFollowers] = useState(initialStore.followers);
  const [comments, setComments] = useState(initialStore.comments);
  const [likes, setLikes] = useState(initialStore.likes);

  function addLike(postId) {
    const like = {
      userId: currentUserId,
      postId,
      datetime: new Date().toISOString(),
    };

    setLikes(likes.concat(like));
  }

  function removeLike(postId) {
    const like = {
      userId: currentUserId,
      postId,
      datetime: new Date().toISOString(),
    };

    setLikes(
      likes.filter(
        (like) => !(like.userId === currentUserId && like.postId === postId)
      )
    );
  }

  function addComment(postId, text) {
    const comment = {
      userId: currentUserId,
      postId,
      text,
      datetime: new Date().toISOString(),
    };
    setComments(comments.concat(comment));
  }

  function addPost(photo, desc) {
    const post = {
      id: uniqueId("post"),
      userId: currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString(),
    };
    setPosts(posts.concat(post));
    setPage("home");
  }

  function addFollower(userId, followerId) {
    const follower = {
      userId,
      followerId,
    };
    setFollowers(followers.concat(follower));
  }

  function removeFollower(userId, followerId) {
    const follower = {
      userId,
      followerId,
    };
    setFollowers(
      followers.filter(
        (fol) =>
          !(
            fol.userId === follower.userId &&
            fol.followerId === follower.followerId
          )
      )
    );
  }
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="container">
        <Header />
        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  currentUserId={currentUserId}
                  posts={posts}
                  users={users}
                  comments={comments}
                  likes={likes}
                  onLike={addLike}
                  onUnlike={removeLike}
                  onComment={addComment}
                />
              }
            ></Route>
            <Route
              path=":postId"
              element={
                <Home
                  currentUserId={currentUserId}
                  posts={posts}
                  users={users}
                  comments={comments}
                  likes={likes}
                  onLike={addLike}
                  onUnlike={removeLike}
                  onComment={addComment}
                />
              }
            ></Route>
            <Route
              path="/profile/:userId"
              element={
                <Profile
                  currentUserId={currentUserId}
                  followers={followers}
                  posts={posts}
                  users={users}
                  onFollow={addFollower}
                  onUnfollow={removeFollower}
                />
              }
            ></Route>
            <Route
              path="newpost"
              element={<NewPost post={posts} onPost={addPost} />}
            ></Route>
            <Route path="activity" element={<Activity />}></Route>
            <Route path="explore" element={<Explore />}></Route>
          </Routes>
        </main>
        <Navbar userId={initialStore.currentUserId} />
      </div>
    </Router>
  );
};
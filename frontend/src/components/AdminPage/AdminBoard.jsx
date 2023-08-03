import classes from "./AdminBoard.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBoard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://i9b103.p.ssafy.io:8000/board/all"
        );
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={classes.admin_board_container}>
      <h1>벨런스 게임 게시판 관리 페이지 입니다.</h1>
      {posts.map((post) => (
        <div key={post.boardSeq}>
          <p>{post.question}</p>
          <p>{post.leftAnswer}</p>
          <p>{post.rightAnswer}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminBoard;

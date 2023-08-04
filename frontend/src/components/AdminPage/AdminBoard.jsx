import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import classes from "./AdminBoard.module.css";

const api = "https://i9b103.p.ssafy.io/api/";
const postsPerPage = 15;

const AdminBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]); // State for selected post ids
  const tableContainerRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${api}board/all`);
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  // Calculate the index of the first and last posts to be displayed on the current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the height of the table container
  useEffect(() => {
    if (tableContainerRef.current) {
      const tableHeight = posts.length <= postsPerPage ? "auto" : "700px";
      tableContainerRef.current.style.height = tableHeight;
    }
  }, [posts]);

  const handleCheckboxChange = (event, boardSeq) => {
    if (event.target.checked) {
      setSelectedPosts([boardSeq]);
    } else {
      setSelectedPosts([]);
    }
  };

  const subTheme = () => {
    if (selectedPosts.length === 1) {
      axios.post(`${api}game/regist/${selectedPosts[0]}`).then((response) => {
        console.log(response);
        // Do something with the response if needed
      });
    } else {
      console.log("Select only one post to submit as the theme.");
    }
  };

  return (
    <div className={classes.admin_board_container}>
      <h1>벨런스 게임 게시판 관리 페이지 입니다.</h1>
      <div className={classes.post_button}>
        <button onClick={subTheme}>주제 등록하기</button>
      </div>

      <div ref={tableContainerRef}>
        {currentPosts.length > 0 && (
          <table className={classes.admin_board_table}>
            <thead>
              <tr className={classes.admin_board_heading}>
                <th>등록번호</th>
                <th>주제</th>
                <th>왼쪽 선택지</th>
                <th>오른쪽 선택지</th>
                <th>좋아요 수</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.boardSeq}>
                  <td>{post.boardSeq}</td>
                  <td>{post.question}</td>
                  <td>{post.leftAnswer}</td>
                  <td>{post.rightAnswer}</td>
                  <td>{post.likeCount}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.boardSeq)}
                      onChange={(e) => handleCheckboxChange(e, post.boardSeq)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {posts.length > postsPerPage && (
        <div className={classes.pagination}>
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map(
            (_, index) => (
              <button key={index} onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default AdminBoard;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import classes from "./AdminBoard.module.css";
const api = "https://i9b103.p.ssafy.io/api/";
const postsPerPage = 15;
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 추가
const formatDateTime = (dateStr, hour) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = hour === "1" ? "02" : "14";
  return `${year}-${month}-${day}T${hours}:00:00`;
};

const AdminBoard = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPosts, setSelectedPosts] = useState([]); // State for selected post ids
  const tableContainerRef = useRef(null);
  const [boardListUpdate, setBoardListUpdate] = useState(true);

  const [categoryList, setCategoryList] = useState([]);
  const [order, setOrder] = useState("dateNew");
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [isIncludeDeleted, setIsIncludeDeleted] = useState(false);

  // 추가
  const [reservations, setReservations] = useState([]);
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [value, onChange] = useState(new Date());
  const [selected, setSelected] = useState("1");
  const [trigger, setTrigger] = useState(true);

  // 추가
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  //너무 길면 생략
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  // 추가
  useEffect(() => {
    axios
      .get(`${api}reservation/list`)
      .then((response) => {
        console.log(response.data);
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, [trigger, boardListUpdate]);

  useEffect(() => {
    axios
      .get(`${api}board/list`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
    axios.get(`${api}category/list`).then((response) => {
      setCategoryList([...response.data]);
    });
  }, [boardListUpdate]);

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

  // 추가
  const handleReservationCheckboxChange = (event, reservationSeq, boardSeq) => {
    if (event.target.checked) {
      setSelectedReservations([reservationSeq, boardSeq]);
    } else {
      setSelectedReservations([]);
    }
  };

  // 추가
  const addReservation = () => {
    const boardSeq = selectedPosts[0];

    const managerId = JSON.parse(localStorage.getItem("loggedInUser")).id;

    const datetime = formatDateTime(value, selected);

    const data = {
      managerId: managerId,
      boardSeq: parseInt(boardSeq),
      dateTime: datetime,
    };

    if (window.confirm("등록하시겠습니까?")) {
      if (selectedPosts.length === 1) {
        axios
          .post(`${api}reservation/regist`, data)
          .then(() => {
            setTrigger(!trigger);
            alert("등록 완료!");
          })
          .catch(() => {
            alert("예약 등록에 실패했습니다.");
          });
      } else {
        alert("예약할 것에 체크해주세요.");
      }
    } else {
      alert("예약 등록을 취소하셨습니다.");
    }
  };

  // 추가
  const deleteReservation = () => {
    const reservationSeq = selectedReservations[0];

    if (window.confirm("예약을 삭제하시겠습니까?")) {
      axios
        .delete(`${api}reservation/delete/${reservationSeq}`)
        .then(() => {
          setTrigger(!trigger);
          alert("삭제 완료!");
        })
        .catch(() => {
          alert("예약 삭제에 실패했습니다.");
        });
    } else {
      alert("삭제 요청을 취소하셨습니다.");
    }
  };

  //글 삭제
  const deletePost = () => {
    if (selectedPosts) {
      if (window.confirm("삭제하시겠습니까?")) {
        const boardInfo = {
          boardSeq: selectedPosts[0],
        };
        axios
          .patch(`${api}managerboard/deleteBoard`, JSON.stringify(boardInfo), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            alert("글 삭제에 성공했습니다.");
            setBoardListUpdate(!boardListUpdate);
          })
          .catch(() => {
            alert("글 삭제에 실패했습니다.");
          });
      }
    }
  };

  // 정렬
  const getOrderedCategoryList = () => {
    axios
      .get(
        `${api}managerboard/list?order=${order}&categorySeq=${selectedCategory}&deleteView=${isIncludeDeleted}`,
      )
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const subTheme = () => {
    const boardSeq = selectedReservations[1];

    if (window.confirm("오늘의 주제로 등록하시겠습니까?")) {
      if (selectedReservations.length === 2) {
        axios.post(`${api}game/regist/${boardSeq}`).then(() => {
          alert("등록 완료!");
        });
      } else {
        console.log("등록할 것에 체크해주세요.");
      }
    } else {
      alert("오늘의 주제로 등록을 취소하셨습니다.");
    }
  };

  return (
    <div className={classes.admin_board_container}>
      <h1>벨런스 게임 게시판 관리 페이지 입니다.</h1>
      <div className={classes.admin_reservation}>
        <div>
          <div className={classes.reservation}>
            <div ref={tableContainerRef}>
              {reservations.length > 0 && (
                <table className={classes.admin_board_table}>
                  <thead>
                    <tr className={classes.admin_board_heading}>
                      <th>등록번호</th>
                      <th>주제</th>
                      <th>왼쪽 선택지</th>
                      <th>오른쪽 선택지</th>
                      <th>좋아요 수</th>
                      <th>닉네임</th>
                      <th>등록 매니저</th>
                      <th>등록 예정 날짜</th>
                      <th>선택</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.reservationSeq}>
                        <td>{reservation.reservationSeq}</td>
                        <td>
                          <Link
                            to={`/admin/adminBoardDetail/${reservation.board.boardSeq}/${reservation.reservationSeq}/${reservation.board.item}`}
                          >
                            {truncateText(reservation.board.question, 10)}
                          </Link>
                        </td>
                        <td>{truncateText(reservation.board.leftAnswer, 10)}</td>
                        <td>{truncateText(reservation.board.rightAnswer, 10)}</td>
                        <td>{reservation.board.likeCount}</td>
                        <td>{truncateText(reservation.board.nickname, 5)}</td>
                        <td>{reservation.managerId}</td>
                        <td>{reservation.dateTime}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedReservations.includes(
                              reservation.reservationSeq,
                            )}
                            onChange={(e) =>
                              handleReservationCheckboxChange(
                                e,
                                reservation.reservationSeq,
                                reservation.board.boardSeq,
                              )
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className={classes.reservation_button}>
            <button onClick={subTheme}>오늘의 주제 등록하기</button>
            <button style={{ color: "red" }} onClick={deleteReservation}>
              예약 삭제
            </button>
          </div>
        </div>
        <div className={classes.reservation_button_element}>
          <Calendar onChange={onChange} value={value}></Calendar>
          <div className={classes.reservation_time}>
            <select className="w150" onChange={handleSelect}>
              <option value="1">오전</option>
              <option value="2">오후</option>
            </select>
            <button onClick={addReservation}>주제 예약하기</button>
          </div>
        </div>
      </div>
      <div className={classes.post_button}>
        <div className={classes.post_button_element}>
          <select
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value="dateNew">최신순</option>
            <option value="dateOld">오래된 순</option>
            <option value="like">좋아요 순</option>
            <option value="category">카테고리 순</option>
          </select>
          <select
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            disabled={order === "category" ? false : true}
          >
            <option value="0">전체</option>
            {categoryList.map((category, idx) => {
              return (
                <option key={idx} value={category.categorySeq}>
                  {category.item}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              setIsIncludeDeleted(e.target.value);
            }}
          >
            <option value={false}>삭제 미포함</option>
            <option value={true}>삭제 포함</option>
          </select>
          <button onClick={getOrderedCategoryList}>정렬</button>
        </div>
        <div className={classes.post_button_element}>
          <button style={{ color: "red" }} onClick={deletePost}>
            글 삭제
          </button>
        </div>
      </div>

      <div ref={tableContainerRef}>
        {currentPosts.length > 0 && (
          <table className={classes.admin_board_table}>
            <thead>
              <tr className={classes.admin_board_heading}>
                <th>등록번호</th>
                <th>카테고리</th>
                <th>주제</th>
                <th>왼쪽 선택지</th>
                <th>오른쪽 선택지</th>
                <th>좋아요 수</th>
                <th>닉네임</th>
                <th>선택</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr key={post.boardSeq}>
                  <td>{post.boardSeq}</td>
                  <td>{truncateText(post.item, 20)}</td>
                  <td>
                    <Link
                      to={`/admin/adminBoardDetail/${post.boardSeq}/${null}/${
                        post.item
                      }`}
                    >
                      {truncateText(post.question, 20)}
                    </Link>
                  </td>
                  <td>{truncateText(post.leftAnswer, 20)}</td>
                  <td>{truncateText(post.rightAnswer, 20)}</td>
                  <td>{post.likeCount}</td>
                  <td>{post.nickname}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPosts.includes(post.boardSeq)}
                      onChange={(e) => {
                        handleCheckboxChange(e, post.boardSeq);
                      }}
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

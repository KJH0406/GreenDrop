import axios from "axios";
import classes from "./AdminBoardDetail.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import React from "react";
function AdminBoardDetail() {
  const navigate = useNavigate();

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

  const { boardSeqParam, reservationSeq, category } = useParams();
  const [reservationInfo, setReservationInfo] = useState({});

  // console.log(reservationSeq);
  const api = "https://i9b103.p.ssafy.io/api";

  const [post, setPost] = useState({});
  const [commentObj, setCommentObj] = useState([]);

  //해당 게시글의 댓글 전부 가져오는 비동기 통신 부분
  useEffect(() => {
    axios
      .get(api + "/managerboard/boardDetail/" + boardSeqParam)
      .then((response) => {
        setPost(response.data);
        for (let i = 0; i < response.data.reservationList.length; i++) {
          if (
            response.data.reservationList[i].reservationSeq ===
            parseInt(reservationSeq)
          ) {
            setReservationInfo(response.data.reservationList[i]);
            console.log(response.data.reservationList[i]);
          }
        }
        console.log(response.data);
      });
    axios
      .get(api + "/managerboard/comments/" + boardSeqParam)
      .then((response) => {
        const fetchedComment = [...response.data];
        setCommentObj(fetchedComment);
        console.log(commentObj);
      });
  }, []);

  const [selectedComments, setSelectedComments] = useState([]);

  const handleCheckboxChange = (e, commentSeq) => {
    if (e.target.checked) {
      setSelectedComments((prevSelected) => [...prevSelected, commentSeq]);
    } else {
      setSelectedComments((prevSelected) =>
        prevSelected.filter((seq) => seq !== commentSeq),
      );
    }
  };

  const deleteComment = () => {
    if (window.confirm("삭제하시겠습니까?")) {
      for (let i = 0; i < selectedComments.length; i++) {
        const commentInfo = {
          commentSeq: selectedComments[i],
        };
        axios
          .patch(
            api + "/managerboard/deleteComment",
            JSON.stringify(commentInfo),
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
          .then((response) => {
            alert("댓글 삭제에 성공했습니다.");
          })
          .catch((error) => {
            console.error(error);
            alert(selectedComments, "댓글 삭제에 실패했습니다.");
          });
      }
    } else {
      alert("삭제를 취소했습니다.");
    }
  };

  return (
    <div className={classes.admin_board_detail_container}>
      <div className={classes.prev_container}>
        <button
          onClick={() => {
            navigate("/admin/adminBoard");
          }}
          className={classes.perv_btn}
        >
          목록으로
        </button>
      </div>
      <table className={classes.admin_board_detail_table}>
        <tbody>
          <tr>
            <th className={classes.left_pos}>등록번호</th>
            <td colSpan={3} className={classes.right_pos}>
              {post.boardSeq?.toLocaleString("ko-KR")}
            </td>
          </tr>
          <tr>
            <th className={classes.left_pos}>주제</th>
            <td className={classes.left_pos}>{post.question}</td>
            <th className={classes.left_pos}>작성자</th>
            <td className={classes.left_pos}>{post.nickname}</td>
          </tr>
          <tr>
            <th className={classes.left_pos}>왼쪽 선택지</th>
            <td className={classes.left_pos}>{post.leftAnswer}</td>
            <th className={classes.left_pos}>좋아요 수</th>
            <td className={classes.right_pos}>
              {post.likeCount >= 0 ? (
                post.likeCount?.toLocaleString("ko-KR")
              ) : (
                <></>
              )}
            </td>
          </tr>
          <tr>
            <th className={classes.left_pos}>오른쪽 선택지</th>
            <td className={classes.left_pos}>{post.rightAnswer}</td>
            <th className={classes.left_pos}>작성 날짜</th>
            <td className={classes.right_pos}>
              {formatDate(post.createdDate)}
            </td>
          </tr>
          <tr>
            <th className={classes.left_pos}>카테고리</th>
            <td className={classes.left_pos}>{category}</td>
            <th className={classes.left_pos}>수정 날짜</th>
            <td className={classes.right_pos}>
              {post.lastModifiedDate ? (
                formatDate(post.lastModifiedDate)
              ) : (
                <></>
              )}
            </td>
          </tr>
          <tr>
            <th className={classes.left_pos}>삭제 여부</th>
            <td className={classes.left_pos}>
              {post.isDeleted === 0 ? "N" : "Y"}
            </td>
            <th className={classes.left_pos}>삭제 날짜</th>
            <td className={classes.right_pos}>
              {post.deletedDateTime ? formatDate(post.deletedDateTime) : <></>}
            </td>
          </tr>
        </tbody>
      </table>
      {reservationInfo ? (
        <table className={classes.admin_board_detail_table}>
          <thead>
            <tr>
              <th className={classes.left_pos}>예약번호</th>
              <th className={classes.left_pos}>등록 예정 날짜</th>
              <th className={classes.left_pos}>등록 매니저</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={classes.right_pos}>
                {reservationInfo.reservationSeq?.toLocaleString("ko-KR")}
              </td>
              <td className={classes.right_pos}>
                {reservationInfo.dateTime ? (
                  formatDate(reservationInfo.dateTime)
                ) : (
                  <></>
                )}
              </td>
              <td className={classes.left_pos}>{reservationInfo.managerId}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <></>
      )}

      <div className={classes.admin_btn_area}>
        <div className={classes.flex_btn}>
          <button
            className={classes.admin_comment_delete_btn}
            onClick={() => {
              deleteComment();
            }}
          >
            댓글 삭제
          </button>
        </div>
        <div className={classes.flex_table}>
          <table className={classes.admin_board_detail_table}>
            <thead>
              <tr>
                <th className={classes.left_pos}>댓글 번호</th>
                <th className={classes.left_pos}>닉네임</th>
                <th className={classes.left_pos}>내용</th>
                <th className={classes.left_pos}>작성 날짜</th>
                <th className={classes.left_pos}>삭제 여부</th>
                <th className={classes.left_pos}>삭제 날짜</th>
                <th className={classes.left_pos}>선택</th>
              </tr>
            </thead>
            <tbody>
              {commentObj.map(({ comment, comments }, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <tr>
                      <td className={classes.right_pos}>
                        {comment.commentSeq?.toLocaleString("ko-KR")}
                      </td>
                      <td className={classes.left_pos}>{comment.nickName}</td>
                      <td className={classes.left_pos}>{comment.content}</td>
                      <td className={classes.right_pos}>
                        {formatDate(comment.createdDate)}
                      </td>
                      <td className={classes.left_pos}>
                        {comment.isDeleted === 0 ? "N" : "Y"}
                      </td>
                      <td className={classes.right_pos}>
                        {comment.isDeleted === 1 ? (
                          formatDate(comment.deletedDateTime)
                        ) : (
                          <></>
                        )}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedComments.includes(
                            comment.commentSeq,
                          )}
                          onChange={(e) => {
                            handleCheckboxChange(e, comment.commentSeq);
                          }}
                          disabled={comment.isDeleted === 1 ? true : false}
                        />
                      </td>
                    </tr>
                    {comments.map((childComment, idx2) => {
                      return (
                        <tr key={idx2}>
                          <td className={classes.right_pos}>
                            {childComment.commentSeq}
                          </td>
                          <td className={classes.left_pos}>
                            {childComment.nickName}
                          </td>
                          <td className={classes.left_pos}>
                            {childComment.content}
                          </td>
                          <td className={classes.right_pos}>
                            {formatDate(childComment.createdDate)}
                          </td>
                          <td className={classes.left_pos}>
                            {childComment.isDeleted === 0 ? "N" : "Y"}
                          </td>
                          <td className={classes.right_pos}>
                            {childComment.isDeleted === 1 ? (
                              formatDate(childComment.deletedDateTime)
                            ) : (
                              <></>
                            )}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedComments.includes(
                                childComment.commentSeq,
                              )}
                              onChange={(e) => {
                                handleCheckboxChange(
                                  e,
                                  childComment.commentSeq,
                                );
                              }}
                              disabled={
                                childComment.isDeleted === 1 ? true : false
                              }
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBoardDetail;

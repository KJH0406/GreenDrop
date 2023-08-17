import axios from "axios";
import classes from "./AdminBoardDetail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
function AdminBoardDetail() {
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
      <table className={classes.admin_board_detail_table}>
        <tbody>
          <tr>
            <th>등록번호</th>
            <td colSpan={3}>{post.boardSeq}</td>
          </tr>
          <tr>
            <th>주제</th>
            <td>{post.question}</td>
            <th>작성자</th>
            <td>{post.nickname}</td>
          </tr>
          <tr>
            <th>왼쪽 선택지</th>
            <td>{post.leftAnswer}</td>
            <th>좋아요 수</th>
            <td>{post.likeCount}</td>
          </tr>
          <tr>
            <th>오른쪽 선택지</th>
            <td>{post.rightAnswer}</td>
            <th>작성 날짜</th>
            <td>{formatDate(post.createdDate)}</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>{category}</td>
            <th>수정 날짜</th>
            <td>
              {post.lastModifiedDate
                ? formatDate(post.lastModifiedDate)
                : "none"}
            </td>
          </tr>
          <tr>
            <th>삭제 여부</th>
            <td>{post.isDeleted === 0 ? "N" : "Y"}</td>
            <th>삭제 날짜</th>
            <td>
              {post.deletedDateTime ? formatDate(post.deletedDateTime) : "none"}
            </td>
          </tr>
        </tbody>
      </table>
      {reservationInfo ? (
        <table className={classes.admin_board_detail_table}>
          <thead>
            <tr>
              <th>예약번호</th>
              <th>등록 예정 날짜</th>
              <th>등록 매니저</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{reservationInfo.reservationSeq}</td>
              <td>
                {reservationInfo.dateTime ? (
                  formatDate(reservationInfo.dateTime)
                ) : (
                  <></>
                )}
              </td>
              <td>{reservationInfo.managerId}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <></>
      )}

      <div className={classes.admin_btn_area}>
        <button
          className={classes.admin_comment_delete_btn}
          onClick={() => {
            deleteComment();
          }}
        >
          댓글 삭제
        </button>
      </div>
      <table className={classes.admin_board_detail_table}>
        <thead>
          <tr>
            <th>댓글 번호</th>
            <th>닉네임</th>
            <th>내용</th>
            <th>작성 날짜</th>
            <th>삭제 여부</th>
            <th>삭제 날짜</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {commentObj.map(({ comment, comments }, idx) => {
            return (
              <React.Fragment key={idx}>
                <tr>
                  <td>{comment.commentSeq}</td>
                  <td>{comment.nickName}</td>
                  <td>{comment.content}</td>
                  <td>{formatDate(comment.createdDate)}</td>
                  <td>{comment.isDeleted === 0 ? "N" : "Y"}</td>
                  <td>
                    {comment.isDeleted === 1
                      ? formatDate(comment.deletedDateTime)
                      : "none"}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedComments.includes(comment.commentSeq)}
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
                      <td>{childComment.commentSeq}</td>
                      <td>{childComment.nickName}</td>
                      <td>{childComment.content}</td>
                      <td>{formatDate(childComment.createdDate)}</td>
                      <td>{childComment.isDeleted === 0 ? "N" : "Y"}</td>
                      <td>
                        {childComment.isDeleted === 1
                          ? formatDate(childComment.deletedDateTime)
                          : "none"}
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedComments.includes(
                            childComment.commentSeq,
                          )}
                          onChange={(e) => {
                            handleCheckboxChange(e, childComment.commentSeq);
                          }}
                          disabled={childComment.isDeleted === 1 ? true : false}
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
  );
}

export default AdminBoardDetail;

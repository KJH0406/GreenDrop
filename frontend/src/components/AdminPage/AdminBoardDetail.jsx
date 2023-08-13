import axios from "axios";
import classes from "./AdminBoardDetail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function AdminBoardDetail() {
  const { boardSeqParam } = useParams();

  const api = "https://i9b103.p.ssafy.io/api";

  const [post, setPost] = useState({});

  //해당 게시글의 댓글 전부 가져오는 비동기 통신 부분
  useEffect(() => {
    axios.get(api + "/board/detail/" + boardSeqParam).then((response) => {
      console.log("글 정보: ", response.data);
      setPost(response.data);
    });
    axios.get(api + "/comment/" + boardSeqParam).then((response) => {
      console.log("댓글정보: ", response.data);
    });
  }, []);

  const [commentObj, setCommentObj] = useState([
    {
      content: "???",
      commentSeq: 159,
      nickName: "키180차은우",
      ip: "172.226.95.47",
      createdDate: "2023-08-09T15:43:35",
      deletedDate: "2023-08-12 17:55:39",
      isDeleted: 1,
    },
    {
      content: "걍 얼굴 잘생기면 끝임 ㅋㅋ",
      commentSeq: 161,
      nickName: "ㅇㅇ",
      ip: "211.36.148.234",
      createdDate: "2023-08-09T15:44:23",
      deletedDate: "2023-08-12 17:53:48",
      isDeleted: 1,
    },
    {
      content: "용범님 존잘?",
      commentSeq: 165,
      nickName: "ssafy",
      ip: "117.111.28.34",
      createdDate: "2023-08-09T16:29:56",
      deletedDate: null,
      isDeleted: 0,
    },
    {
      content: "ㅇㅇ 존잘",
      commentSeq: 166,
      nickName: "ssafy",
      ip: "117.111.28.34",
      createdDate: "2023-08-09T16:34:04",
      deletedDate: null,
      isDeleted: 0,
    },
    {
      content: "나예요 ㅋ",
      commentSeq: 167,
      nickName: "3반 김용범",
      ip: "117.111.28.34",
      createdDate: "2023-08-09T16:34:26",
      deletedDate: null,
      isDeleted: 0,
    },
  ]);

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
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
          alert(selectedComments, "댓글 삭제 실패");
        });
    }
  };

  return (
    <div className={classes.admin_board_detail_container}>
      <table className={classes.admin_board_detail_table}>
        <tbody>
          <tr>
            <th>등록번호</th>
            <td>{post.boardSeq}</td>
            <th>등록 예정 날짜</th>
            <td>none</td>
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
            <th>작성일</th>
            <td>{post.createdDate}</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>{post.item}</td>
            <th>수정일</th>
            <td>{post.lastModifiedDate ? post.lastModifiedDate : "none"}</td>
          </tr>
        </tbody>
      </table>
      <div className={classes.admin_btn_area}>
        <button
          className={classes.admin_comment_delete_btn}
          onClick={() => {
            deleteComment();
          }}
        >
          선택한 댓글 삭제
        </button>
      </div>
      <table className={classes.admin_board_detail_table}>
        <thead>
          <tr>
            <th>댓글 번호</th>
            <th>닉네임</th>
            <th>내용</th>
            <th>작성 일시</th>
            <th>삭제 여부</th>
            <th>삭제 일시</th>
            <th>선택</th>
          </tr>
        </thead>
        <tbody>
          {commentObj.map((comment, idx) => {
            return (
              <tr key={idx}>
                <td>{comment.commentSeq}</td>
                <td>{comment.nickName}</td>
                <td>{comment.content}</td>
                <td>{comment.createdDate}</td>
                <td>{comment.isDeleted === 0 ? "N" : "Y"}</td>
                <td>{comment.isDeleted ? comment.deletedDate : "none"}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedComments.includes(comment.commentSeq)}
                    onChange={(e) => {
                      handleCheckboxChange(e, comment.commentSeq);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBoardDetail;

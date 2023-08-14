import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import trashcan from "../../assets/trashcan.png";
import { getCommentList, toggleIsOpenComment } from "../../store";
import classes from "./BalanceGameCommentModal.module.css";

function BalanceGameCommentModal({
  boardSeq,
  setShowCheckModal,
  setConfirm,
  setConfirmModalData,
  commentUpdate,
  setCommentUpdate,
  getOrderedBoardList,
}) {
  const api = "https://i9b103.p.ssafy.io/api";
  const dispatch = useDispatch();

  //댓글, 대댓글 변수
  const [isWriteChildComment, setIsWriteChildComment] = useState(false);

  //댓글 모달
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });

  //댓글 불러오기
  const commentObj = useSelector((state) => {
    return state.commentObj;
  });

  useEffect(() => {
    axios
      .get(`${api}/comment/${boardSeq}`)
      .then((response) => {
        const fetchedCommentList = [...response.data];
        dispatch(getCommentList(fetchedCommentList));
      })
      .catch((error) => {});
  }, [dispatch, commentUpdate, boardSeq]);

  //시간 출력 형식 변환
  function timePassed(date) {
    let timeValue = new Date(date);
    let today = new Date();
    let time = (today - timeValue) / 1000 / 60;
    if (time < 1) {
      return "방금 전";
    }
    if (time < 60) {
      return parseInt(time) + "분 전";
    }
    time = time / 60; // 시간
    if (time < 24) {
      return parseInt(time) + "시간 전";
    }
    time = time / 24;
    if (time < 7) {
      return parseInt(time) + "일 전";
    }
    return `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일`;
  }

  //부모 댓글 등록
  const [nickname, setNickname] = useState(null);
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [inputNickname, setInputNickname] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputComment, setInputComment] = useState("");

  function handleCommentRegist() {
    const newComment = {
      nickName: nickname || null,
      password: password,
      content: comment,
    };
    if (newComment.content.length === 0) {
      setConfirm(true);
      setShowCheckModal(true);
      setConfirmModalData({
        confirmTitle: "댓글을 작성해주세요",
        confirmCategory: "comment",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else if (!newComment.password) {
      setConfirm(true);
      setShowCheckModal(true);
      setConfirmModalData({
        confirmTitle: "비밀번호를 입력하세요",
        confirmCategory: "comment",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else {
      axios
        .post(
          `${api}/comment/regist/parent/${boardSeq}`,
          JSON.stringify(newComment),
          {
            headers: {
              "Content-Type": `application/json`,
            },
          },
        )
        .then(() => {
          setCommentUpdate(!commentUpdate);
          getOrderedBoardList();
          setNickname(null);
          setPassword("");
          setComment("");
          setInputNickname("");
          setInputPassword("");
          setInputComment("");
        })
        .catch((error) => {
          setConfirm(true);
          setShowCheckModal(true);
          setConfirmModalData({
            confirmTitle: "댓글 등록 실패",
            confirmCategory: "comment",
            confirmType: "regist",
            confirmAction: "실패",
          });
        });
    }
  }

  // 대댓글 등록
  const [parentNum, setParentNum] = useState(null);

  function handleChildCommentRegist() {
    const newComment = {
      nickName: nickname || null,
      password: password,
      content: comment,
    };
    if (newComment.content.length === 0) {
      setConfirm(true);
      setShowCheckModal(true);
      setConfirmModalData({
        confirmTitle: "답글을 작성해주세요",
        confirmCategory: "comment",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else if (!newComment.password) {
      setConfirm(true);
      setShowCheckModal(true);
      setConfirmModalData({
        confirmTitle: "비밀번호를 입력하세요",
        confirmCategory: "comment",
        confirmType: "regist",
        confirmAction: "실패",
      });
    } else {
      axios
        .post(
          `${api}/comment/regist/child/${parentNum}`,
          JSON.stringify(newComment),
          {
            headers: {
              "Content-Type": `application/json`,
            },
          },
        )
        .then(() => {
          setCommentUpdate(!commentUpdate);
          getOrderedBoardList();
          setNickname(null);
          setPassword("");
          setComment("");
          setInputNickname("");
          setInputPassword("");
          setInputComment("");
        })
        .catch((error) => {
          setConfirm(true);
          setShowCheckModal(true);
          setConfirmModalData({
            confirmTitle: "답글 등록 실패",
            confirmCategory: "childcomment",
            confirmType: "regist",
            confirmAction: "실패",
          });
        });
    }
  }

  return (
    <div>
      <div
        className={classes.backdrop}
        onClick={() => {
          dispatch(toggleIsOpenComment(isOpenComment.isOpenComment));
          dispatch(getCommentList([]));
        }}
      >
        <div
          className={classes.comment_outer_box}
          onClick={(e) => {
            setIsWriteChildComment(false);
            e.stopPropagation();
          }}
        >
          <div className={classes.comment_inner_box}>
            <div className={classes.comment_top}>
              <h2>댓글</h2>
            </div>

            <div className={classes.comment_middle}>
              {commentObj.map(({ comment, comments }, idx) => {
                return (
                  <div key={idx} className={classes.comment_area}>
                    <div className={classes.parent_comment}>
                      <div className={classes.comment_area_top}>
                        <div className={classes.cooment_area_top_left}>
                          <span className={classes.name_area}>
                            {comment.nickName} &nbsp;
                          </span>
                          <span>{timePassed(comment.createdDate)}</span>
                        </div>

                        <img
                          src={trashcan}
                          alt=""
                          className={classes.trashcan_img}
                          onClick={() => {
                            setShowCheckModal({
                              commentSeq: comment.commentSeq,
                              title: "본인이 작성한 댓글만 삭제할 수 있습니다.",
                              category: "comment",
                              type: "delete",
                              action: "삭제하기",
                            });
                          }}
                        />
                      </div>
                      <div className={classes.comment_area_middle}>
                        {comment.content}
                      </div>
                      <div
                        className={classes.comment_area_bottom}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsWriteChildComment(true);
                          setParentNum(comment.commentSeq);
                        }}
                      >
                        답글달기
                      </div>
                    </div>
                    <div className={classes.child_comment_area}>
                      {comments.map((childComment, idx2) => {
                        return (
                          <div key={idx2} className={classes.child_comment}>
                            <div className={classes.comment_area_top}>
                              <div className={classes.coment_area_top_left}>
                                <span className={classes.name_area}>
                                  {childComment.nickName} &nbsp;
                                </span>
                                <span>
                                  {timePassed(childComment.createdDate)}
                                </span>
                              </div>

                              <img
                                src={trashcan}
                                alt=""
                                className={classes.trashcan_img}
                                onClick={() => {
                                  setShowCheckModal({
                                    commentSeq: childComment.commentSeq,
                                    title:
                                      "본인이 작성한 댓글만 삭제할 수 있습니다.",
                                    category: "comment",
                                    type: "delete",
                                    action: "삭제하기",
                                  });
                                }}
                              />
                            </div>
                            <div className={classes.comment_area_middle}>
                              {childComment.content}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {isWriteChildComment ? (
              <div
                className={classes.comment_bottom}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className={classes.user_info}>
                  <div className={classes.user_info_input_area}>
                    <input
                      type="text"
                      className={classes.password_input}
                      placeholder="닉네임을 입력하세요."
                      value={inputNickname}
                      onChange={(e) => {
                        setInputNickname(e.target.value);
                        setNickname(e.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.password_input_area}>
                    <input
                      type="password"
                      inputMode="numeric"
                      className={classes.password_input}
                      placeholder="비밀번호를 입력하세요."
                      value={inputPassword}
                      onChange={(e) => {
                        setInputPassword(e.target.value);
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={classes.comment_input_area}>
                  <input
                    type="text"
                    className={classes.input_tag}
                    placeholder="답글을 등록하세요"
                    value={inputComment}
                    onChange={(e) => {
                      setInputComment(e.target.value);
                      setComment(e.target.value);
                    }}
                  />

                  <button
                    className={classes.regist_btn}
                    onClick={() => {
                      handleChildCommentRegist();
                    }}
                  >
                    등록
                  </button>
                </div>
              </div>
            ) : (
              <div className={classes.comment_bottom}>
                <div className={classes.user_info}>
                  <div className={classes.user_info_input_area}>
                    <input
                      type="text"
                      className={classes.password_input}
                      placeholder="닉네임을 입력하세요."
                      value={inputNickname}
                      onChange={(e) => {
                        setInputNickname(e.target.value);
                        setNickname(e.target.value);
                      }}
                    />
                  </div>
                  <div className={classes.password_input_area}>
                    <input
                      type="password"
                      inputMode="numeric"
                      className={classes.password_input}
                      placeholder="비밀번호를 입력하세요."
                      value={inputPassword}
                      onChange={(e) => {
                        setInputPassword(e.target.value);
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className={classes.comment_input_area}>
                  <input
                    type="text"
                    className={classes.input_tag}
                    placeholder="댓글을 등록하세요"
                    value={inputComment}
                    onChange={(e) => {
                      setInputComment(e.target.value);
                      setComment(e.target.value);
                    }}
                  />

                  <button
                    className={classes.regist_btn}
                    onClick={() => {
                      handleCommentRegist();
                    }}
                  >
                    등록
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BalanceGameCommentModal;

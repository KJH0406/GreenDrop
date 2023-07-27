import { useState } from "react"
import { toggleIsOpenComment } from "../../store"
import classes from "./BalanceGameCommentModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import trashcan from "../../assets/trashcan.png"
function BalanceGameCommentModal() {
  const dispatch = useDispatch()

  const [isWriteComment, setIsWriteComment] = useState(false)

  const [commentObj] = useState([
    {
      comment: {
        content: "닉네임 있는 댓글 등록중",
        nickName: "닉네임",
        ip: "127.0.0.1",
        createdDate: "2023-07-26T12:53:01",
      },
      comments: [
        {
          content: "닉네임 있는 댓글 등록중",
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:52:13",
        },
        {
          content: "대댓글 테스트",
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:54:58",
        },
        {
          content: "대댓글 테스트",
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:55:19",
        },
        {
          content: "대댓글 테스트",
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:55:25",
        },
        {
          content: "시간 테스트",
          nickName: "child",
          ip: "127.0.0.1",
          createdDate: "2023-07-27T13:19:55",
        },
      ],
    },
    {
      comment: {
        content: "대댓글 테스트",
        nickName: "ssafy",
        ip: "127.0.0.1",
        createdDate: "2023-07-26T12:54:15",
      },
      comments: [],
    },
  ])

  const isOpenComment = useSelector((state) => {
    return state.isOpenComment
  })

  // console.log(new Date().toISOString().slice(0, -5))
  function timePassed(date) {
    let timeValue = new Date(date)
    let today = new Date()
    // 분을 나타냄
    let time = (today - timeValue) / 1000 / 60

    if (time < 1) {
      return "방금 전"
    }
    if (time < 60) {
      return parseInt(time) + "분 전"
    }
    time = time / 60 // 시간
    if (time < 24) {
      return parseInt(time) + "시간 전"
    }
    time = time / 24
    if (time < 7) {
      return parseInt(time) + "일 전"
    }
    // return `${date.getFullYear()}년 ${
    //   date.getMonth() + 1
    // }월 ${date.getDate()}일`
  }

  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        dispatch(toggleIsOpenComment(isOpenComment.isOpenComment))
      }}
    >
      <div
        className={classes.comment_outer_box}
        onClick={(e) => {
          e.stopPropagation()
          setIsWriteComment(false)
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
                      <div
                        onClick={() => {
                          console.log("삭제")
                        }}
                        className={classes.img_wrapper}
                      >
                        <input
                          type="image"
                          src={trashcan}
                          alt=""
                          className={classes.trashcan_img}
                        />
                      </div>
                    </div>
                    <div className={classes.comment_area_middle}>
                      {comment.content}
                    </div>
                    <div
                      className={classes.comment_area_bottom}
                      onClick={(e) => {
                        console.log("답글달기")
                        setIsWriteComment(true)
                        e.stopPropagation()
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
                            <div
                              onClick={() => {
                                console.log("삭제")
                              }}
                              className={classes.img_wrapper}
                            >
                              <input
                                type="image"
                                src={trashcan}
                                alt=""
                                className={classes.trashcan_img}
                              />
                            </div>
                          </div>
                          <div className={classes.comment_area_middle}>
                            {childComment.content}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
          {isWriteComment ? (
            <div className={classes.comment_bottom}>
              <div className={classes.comment_input_area}>
                <input
                  type="text"
                  className={classes.input_tag}
                  placeholder="댓글을 등록하세요"
                />

                <input
                  type="button"
                  className={classes.regist_btn}
                  value="등록"
                />
              </div>
              <div className={classes.password_input_area}>
                <input
                  type="password"
                  className={classes.password_input}
                  placeholder="추후 수정이나 삭제를 원하시면 비밀번호를 입력하세요"
                />
              </div>
            </div>
          ) : (
            <div className={classes.comment_bottom}></div>
          )}
        </div>
      </div>
    </div>
  )
}
export default BalanceGameCommentModal

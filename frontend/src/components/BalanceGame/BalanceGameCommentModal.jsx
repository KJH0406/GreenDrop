import { useState } from "react"
import { toggleIsOpenComment } from "../../store"
import classes from "./BalanceGameCommentModal.module.css"
import { useDispatch, useSelector } from "react-redux"
import trashcan from "../../assets/trashcan.png"
function BalanceGameCommentModal({ boardSeq }) {
  const dispatch = useDispatch()

  const [isWriteChildComment, setIsWriteChildComment] = useState(false)

  const [parentCommentNumber, setParentCommentNumber] = useState("")
  // const [parentUser, setParentUser] = useState("")

  const commentObj = useSelector((state) => {
    return state.commentObj
  })
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
    return `${today.getFullYear()}년 ${
      today.getMonth() + 1
    }월 ${today.getDate()}일`
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
          setIsWriteChildComment(false)
          // setParentUser("")
          e.stopPropagation()
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
                        setIsWriteChildComment(true)
                        // setParentUser(comment.nickName)
                        setParentCommentNumber(comment.commentSeq)
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

          {isWriteChildComment ? (
            <div className={classes.comment_bottom}>
              <div className={classes.user_info_input_area}>
                <input
                  type="text"
                  className={classes.password_input}
                  placeholder="닉네임을 입력하세요."
                />
              </div>
              <div className={classes.password_input_area}>
                <input
                  type="password"
                  className={classes.password_input}
                  placeholder="비밀번호를 입력하세요."
                />
              </div>
              <div className={classes.comment_input_area}>
                <input
                  type="text"
                  className={classes.input_tag}
                  // value={parentUser || ` `}
                  placeholder="답글을 등록하세요"
                />

                <button
                  className={classes.regist_btn}
                  onClick={() => {
                    console.log(parentCommentNumber)
                  }}
                >
                  등록
                </button>
              </div>
            </div>
          ) : (
            <div className={classes.comment_bottom}>
              <div className={classes.user_info_input_area}>
                <input
                  type="text"
                  className={classes.password_input}
                  placeholder="닉네임을 입력하세요."
                />
              </div>
              <div className={classes.password_input_area}>
                <input
                  type="password"
                  className={classes.password_input}
                  placeholder="비밀번호를 입력하세요."
                />
              </div>
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
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default BalanceGameCommentModal

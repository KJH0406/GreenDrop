import classes from "./BalanceGameWriteForm.module.css"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function BalanceGameWriteFormPage() {
  const [question, setQuestion] = useState("")
  const [leftAnswer, setLeftAnswer] = useState("")
  const [rightAnswer, setRightAnswer] = useState("")
  const [nickname, setNickname] = useState("")
  const [category, setCategory] = useState("")
  const [password, setPassword] = useState("")
  const [card, setCard] = useState("")
  const categories = useSelector((state) => {
    return state.categories
  })

  return (
    <div className={classes.regist_box}>
      <div className={classes.title}>
        <h2 className={classes.first_word}>Green &nbsp;</h2>
        <h2 className={classes.second_word}>Balance Game</h2>
      </div>
      <div className={classes.outer_box}>
        <div className={classes.top}>
          <div className={`${classes.top_item} `}>
            <input
              className={`${classes.input_tag} ${classes.subject}`}
              type="text"
              placeholder="상황 설명*(필수)(최대 30자)"
              onChange={(e) => {
                setQuestion(e.target.value)
                console.log(question)
              }}
            />
          </div>
        </div>
        <div className={classes.middle}>
          <div className={`${classes.middle_item} ${classes.middle_item_left}`}>
            <textarea
              className={classes.text_input}
              placeholder="선택지1(필수)(최대50자)"
              onChange={(e) => {
                setLeftAnswer(e.target.value)
                console.log(leftAnswer)
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
          <div
            className={`${classes.middle_item} ${classes.middle_item_right}`}
          >
            <textarea
              className={classes.text_input}
              placeholder="선택지2(필수)(최대50자)"
              onChange={(e) => {
                setRightAnswer(e.target.value)
                console.log(rightAnswer)
              }}
            ></textarea>
            <div className={classes.cover_bar}></div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            {/* 카테고리 선택하는 부분 */}
            <select
              name="category"
              className={classes.category}
              onChange={(e) => {
                setCategory(e.target.value)
                console.log(category)
              }}
            >
              {categories.map((item, idx) => {
                return (
                  <option value={item} key={idx}>
                    {item}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
      </div>
      {/* 닉네임, 비밀번호 입력받을 부분 */}
      <div className={classes.info_input_area}>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="text"
            placeholder="닉네임을 입력하세요 (최대 10자)"
            onChange={(e) => {
              setNickname(e.target.value)
            }}
          />
        </div>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="password"
            placeholder="비밀번호를 입력하세요 (최대 10자)"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <input
          type="button"
          className={classes.regist_btn}
          value="밸런스 게임 등록하기"
          onClick={() => {
            setCard({
              question: question,
              leftAnswer: leftAnswer,
              rightAnswer: rightAnswer,
              nickname: nickname,
              password: password,
              category: category,
            })
            console.log(card)
          }}
        ></input>
        <Link className={classes.regist_btn} to={"/board"}>
          목록으로
        </Link>
      </div>
    </div>
  )
}

export default BalanceGameWriteFormPage

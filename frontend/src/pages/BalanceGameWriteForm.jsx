import classes from "./BalanceGameWriteForm.module.css"

import { useState } from "react"

function BalanceGameWriteFormPage() {
  const [question, setQuestion] = useState("")
  const [leftAnswer, setLeftAnswer] = useState("")
  const [rightAnswer, setRightAnswer] = useState("")
  const [categories] = useState(["카테고리 등록", "스포츠", "요리", "진로"])
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
            <select name="category" className={classes.category}>
              {categories.map((category, idx) => {
                return (
                  <option value={category} key={idx}>
                    {category}
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
          />
        </div>
        <div className={classes.info_input}>
          <input
            className={classes.input_tag}
            type="text"
            placeholder="닉네임을 입력하세요 (최대 10자)"
          />
        </div>
        <input
          type="button"
          className={classes.regist_btn}
          value="밸런스 게임 등록하기"
          onClick={() => {}}
        ></input>
      </div>
    </div>
  )
}

export default BalanceGameWriteFormPage

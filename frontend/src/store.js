import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let todayCount = createSlice({
  name: "todayCount",
  initialState: "121",
});

let totalCount = createSlice({
  name: "totalCount",
  initialState: "2,500",
});

let countBundle = createSlice({
  name: "countBundle",
  initialState: [{ leftCount: "89" }, { rightCount: "32" }],
});

let balanceGame = createSlice({
  name: "balanceGame",
  initialState: [
    { title: "다시 태어난다면?" },
    { left: "100억으로 20살까지만 살기" },
    { right: "월 100만원으로 100살까지 살기" },
  ],
});

let balanceGameList = createSlice({
  name: "balanceGameList",
  initialState: [],
  reducers: {
    getBoardList(state, action) {
      return action.payload;
    },
    searchBoard(state, action) {
      return action.payload;
    },
  },
});

export let { getBoardList, searchBoard } = balanceGameList.actions;

let isOpenComment = createSlice({
  name: "isOpenComment",
  initialState: { isOpenComment: false, boardSeq: "" },
  reducers: {
    toggleIsOpenComment(state, action) {
      // console.log(state.isOpenComment)
      // console.log(action.payload)
      state.isOpenComment = !action.payload;
    },
    changeBoardSeq(state, action) {
      state.boardSeq = action.boardSeq;
    },
  },
});

let categories = createSlice({
  name: "categories",
  initialState: ["카테고리 등록", "스포츠", "요리", "진로"],
});

let commentObj = createSlice({
  name: "commentObj",
  initialState: [
    {
      comment: {
        content: "닉네임 있는 댓글 등록중",
        commentSeq: 11,
        board: 6,
        nickName: "닉네임",
        ip: "127.0.0.1",
        createdDate: "2023-07-26T12:53:01",
      },
      comments: [
        {
          content: "닉네임 있는 댓글 등록중",
          commentSeq: 10,
          board: 6,
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:52:13",
        },
        {
          content: "대댓글 테스트",
          commentSeq: 13,
          board: 6,
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:54:58",
        },
        {
          content: "대댓글 테스트",
          commentSeq: 14,
          board: 6,
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:55:19",
        },
        {
          content: "대댓글 테스트",
          commentSeq: 15,
          board: 6,
          nickName: "ssafy",
          ip: "127.0.0.1",
          createdDate: "2023-07-26T12:55:25",
        },
        {
          content: "시간 테스트",
          commentSeq: 16,
          board: 6,
          nickName: "child",
          ip: "127.0.0.1",
          createdDate: "2023-07-27T13:19:55",
        },
      ],
    },
    {
      comment: {
        content: "대댓글 테스트",
        commentSeq: 12,
        board: 6,
        nickName: "ssafy",
        ip: "127.0.0.1",
        createdDate: "2023-07-26T12:54:15",
      },
      comments: [],
    },
  ],
  reducers: {
    getCommentList(state, action) {
      axios
        .get("http://i9b103.p.ssafy.io:8000/comment" + action.payload)
        .then((response) => {
          state = [response];
        });
    },
  },
});

export let { toggleIsOpenComment, changeBoardSeq } = isOpenComment.actions;

export default configureStore({
  reducer: {
    todayCount: todayCount.reducer,
    totalCount: totalCount.reducer,
    countBundle: countBundle.reducer,
    balanceGame: balanceGame.reducer,
    balanceGameList: balanceGameList.reducer,
    isOpenComment: isOpenComment.reducer,
    categories: categories.reducer,
    commentObj: commentObj.reducer,
  },
});

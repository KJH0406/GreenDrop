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
  initialState: [],
  reducers: {
    getCategoryList(state, action) {
      return action.payload;
    },
  },
});

let commentObj = createSlice({
  name: "commentObj",
  initialState: [],
  reducers: {
    getCommentList(state, action) {
      console.log(action.payload);
      return action.payload;
    },
  },
});
export let { getBoardList, searchBoard } = balanceGameList.actions;

export let { getCommentList } = commentObj.actions;
export let { toggleIsOpenComment, changeBoardSeq } = isOpenComment.actions;
export let { getCategoryList } = categories.actions;

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

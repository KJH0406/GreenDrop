import { configureStore, createSlice } from "@reduxjs/toolkit";

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
    // retCategoryList(state) {
    //   console.log(state);
    //   // return state
    // },
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
    balanceGameList: balanceGameList.reducer,
    isOpenComment: isOpenComment.reducer,
    categories: categories.reducer,
    commentObj: commentObj.reducer,
  },
});

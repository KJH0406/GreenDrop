import { configureStore, createSlice } from "@reduxjs/toolkit";

let todayCount = createSlice({
  name: "todayCount",
  initialState: "121",
});

let totalCount = createSlice({
  name: "totalCount",
  initialState: "2500",
});

let leftCount = createSlice({
  name: "leftCount",
  initialState: "89",
});

let rightCount = createSlice({
  name: "rightCount",
  initialState: "32",
});

let leftAnswer = createSlice({
  name: "leftAnswer",
  initialState: [{ leftCount: "89" }, { left: "100억으로 20살까지만 살기" }],
});

let rightAnswer = createSlice({
  name: "rightAnswer",
  initialState: [
    { rightCount: "32" },
    { right: "월 100만원으로 100살까지 살기" },
  ],
});

export default configureStore({
  reducer: {
    todayCount: todayCount.reducer,
    totalCount: totalCount.reducer,
    leftCount: leftCount.reducer,
    rightCount: rightCount.reducer,
    leftAnswer: leftAnswer.reducer,
    rightAnswer: rightAnswer.reducer,
  },
});

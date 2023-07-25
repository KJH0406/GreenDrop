import { configureStore, createSlice } from "@reduxjs/toolkit";

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

export default configureStore({
  reducer: {
    todayCount: todayCount.reducer,
    totalCount: totalCount.reducer,
    countBundle: countBundle.reducer,
    balanceGame: balanceGame.reducer,
  },
});

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./pages/Root"
import IntroPage from "./pages/Intro"
import HomePage from "./pages/Home"
import AdminPage from "./pages/Admin"
import BoardPage from "./pages/Board"
import DevicePage from "./pages/Device"
import GreenStoryPage from "./pages/GreenStory"
import GuidePage from "./pages/Guide"
import LocationPage from "./pages/Location"
import StatusPage from "./pages/Status"
import BalanceGameWriteFormPage from "./pages/BalanceGameWriteForm"
import BalaceGameModifyFormPage from "./pages/BalanceGameModifyForm"
import AdminMain from "./components/AdminPage/AdminMain"

//새롭게 추가한 부분 디바이스UI작업
import { QueryClient, QueryClientProvider } from "react-query" // 추가
import ManagerLogin from "./pages/ManagerLogin"
import AccountManagement from "./components/AdminPage/AccountManagement"
import AdminBoard from "./components/AdminPage/AdminBoard"
import AdminCategories from "./components/AdminPage/AdminCategories"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    //Pages
    children: [
      // 앱 실행시 처음 보여질 화면
      { index: true, element: <IntroPage /> },

      // 각 페이지 링크
      { path: "home", element: <HomePage /> },
      { path: "greenStory", element: <GreenStoryPage /> },
      { path: "guide", element: <GuidePage /> },
      { path: "location", element: <LocationPage /> },
      { path: "status", element: <StatusPage /> },

      // 밸런스 게임 게시판 링크
      { path: "board", element: <BoardPage /> },
      { path: "board/write", element: <BalanceGameWriteFormPage /> },
      { path: "board/modify", element: <BalaceGameModifyFormPage /> },
    ],
  },
  {
    path: "device",
    element: <DevicePage />,
  },
  {
    path: "login",
    element: <ManagerLogin />,
  },
  {
    path: "admin",
    element: <AdminPage />,
    children: [
      { index: true, element: <AdminMain /> },
      { path: "accountManagement", element: <AccountManagement /> },
      { path: "adminBoard", element: <AdminBoard /> },
      { path: "adminCategories", element: <AdminCategories /> },
    ],
  },
])

function App() {
  // 디바이스 페이지를 위하여 리액트 쿼리 설정
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App

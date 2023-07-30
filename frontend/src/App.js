import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import IntroPage from "./pages/Intro";
import HomePage from "./pages/Home";
import AdminPage from "./pages/Admin";
import BoardPage from "./pages/Board";
import DevicePage from "./pages/Device";
import GreenStoryPage from "./pages/GreenStory";
import GuidePage from "./pages/Guide";
import LocationPage from "./pages/Location";
import StatusPage from "./pages/Status";
import BalanceGameWriteFormPage from "./pages/BalanceGameWriteForm";

//새롭게 추가한 부분 디바이스UI작업
import { QueryClient, QueryClientProvider } from "react-query"; // 추가

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    //Pages
    children: [
      // 앱 실행시 처음 보여질 화면
      { index: true, element: <IntroPage /> },

      // 이 외의 각 페이지
      { path: "home", element: <HomePage /> },
      { path: "admin", element: <AdminPage /> },
      { path: "board", element: <BoardPage /> },

      { path: "greenStory", element: <GreenStoryPage /> },
      { path: "guide", element: <GuidePage /> },
      { path: "location", element: <LocationPage /> },
      { path: "status", element: <StatusPage /> },
      { path: "board/write", element: <BalanceGameWriteFormPage /> },
    ],
  },
  {
    path: "device",
    element: <DevicePage />,
  },
]);

function App() {
  // 디바이스 페이지를 위하여 리액트 쿼리 설정
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

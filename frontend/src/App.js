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
      { path: "device", element: <DevicePage /> },
      { path: "greenStory", element: <GreenStoryPage /> },
      { path: "guide", element: <GuidePage /> },
      { path: "location", element: <LocationPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

import { Navigate } from "react-router-dom";
import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Quizz from "../pages/Quizz";
import HTML5 from "../pages//Pages_Quizz/HTML5";
import Topics from "../pages/Topics";
import CSS_PAGE from "../pages/Pages_Quizz/CSS_PAGE";
import JAVASCRIPT_PAGE from "../pages/Pages_Quizz/JAVASCRIPT_PAGE";
import REACTJS from "../pages/Pages_Quizz/REACTJS";
import HTML5_ANSWERS from "../pages/Answers/HTML5_ANSWER";
import Questions from "../pages/Questions";
import CSS3_ANSWER from "../pages/Answers/CSS3_ANSWER";
import JS_ANSWER from "../pages/Answers/JS_ANSWER";
import REACTJS_ANSWER from "../pages/Answers/REACTJS_ANSWER";
import History from "../pages/History";
import DetailHistory from "../components/DetailHistory";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <SignUp />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        path: "quizz",
        element: <Quizz />,
        children: [
          {
            index: true,
            element: <Topics />,
          },
          {
            path: "html5",
            element: <Questions />,
            children: [
              {
                index: true,
                element: <HTML5 />,
              },
              {
                path: "reveal",
                element: <HTML5_ANSWERS />,
              },
            ],
          },
          {
            path: "css3",
            element: <Questions />,
            children: [
              {
                index: true,
                element: <CSS_PAGE />,
              },
              {
                path: "reveal",
                element: <CSS3_ANSWER />,
              },
            ],
          },
          {
            path: "javascript",
            element: <Questions />,
            children: [
              {
                index: true,
                element: <JAVASCRIPT_PAGE />,
              },
              {
                path: "reveal",
                element: <JS_ANSWER />,
              },
            ],
          },
          {
            path: "reactjs",
            element: <Questions />,
            children: [
              {
                index: true,
                element: <REACTJS />,
              },
              {
                path: "reveal",
                element: <REACTJS_ANSWER />,
              },
            ],
          },
        ],
      },
      {
        path: "history",
        element: <Questions />,
        children: [
          {
            index: true,
            element: <History />,
          },
          {
            path: ":date",
            element: <DetailHistory />,
          },
        ],
      },
    ],
  },
];

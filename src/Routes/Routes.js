import { createBrowserRouter } from "react-router-dom";
import Add from "../Add/Add";
import DemoAdd from "../Add/DemoAdd";
import ErrorPage from "../Components/ErrorPage";
import NoAccess from "../Components/NoAccess";
import Dashboard from "../Dashboard/Dashboard";
import ShowAllData from "../Dashboard/ShowAllData";
import ShowByCatg from "../Dashboard/ShowByCatg";
import ShowByDate from "../Dashboard/ShowByDate";
import ShowByMonth from "../Dashboard/ShowByMonth";
import ShowByYear from "../Dashboard/ShowByYear";
import Home from "../Home/Home";
import Main from "../Layout/Main";
import Login from "../SignInUp/Login";
import Register from "../SignInUp/Register";
import PrivateAdmin from "./PrivateAdmin";
import PrivateRoutes from "./PrivateRoutes";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/add',
                element: <PrivateRoutes><PrivateAdmin><DemoAdd></DemoAdd></PrivateAdmin></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/noAccess',
                element: <NoAccess></NoAccess>
            }


        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><PrivateAdmin><Dashboard></Dashboard></PrivateAdmin></PrivateRoutes>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/dashboard",
                element: <ShowAllData></ShowAllData>
            },
            {
                path: "/dashboard/showByDate",
                element: <ShowByDate></ShowByDate>
            },
            {
                path: "/dashboard/showByMonth",
                element: <ShowByMonth></ShowByMonth>
            },
            {
                path: "/dashboard/showByYear",
                element: <ShowByYear></ShowByYear>
            },
            {
                path: "/dashboard/showByCatg",
                element: <ShowByCatg></ShowByCatg>
            },
        ]
    }
])
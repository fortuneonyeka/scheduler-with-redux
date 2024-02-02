import "./App.css";
import SideNav from "./components/navigations/NavBar";
import BasicCalendar from "./components/basicCalendar/BasicCalendar";
import Dashboard from "./pages/dashboard/Dashboard";
import Events from "./pages/events/Events";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <SideNav  />
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboard data-testid="dashboard"/>,
      },
      {
        path: "/calendar",
        element: <BasicCalendar data-testid="basic-calendar"/>,
      },
      {
        path: "/events",
        element: <Events data-testid="events" />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="conten">
        <div className="calendar-container">
          <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;

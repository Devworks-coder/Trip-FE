import { createBrowserRouter } from "react-router-dom";

import {
  BadgeIndianRupee,
  Bus,
  ChartColumn,
  Plus,
  SquareActivity,
  SquareUserRound,
  User,
  Users,
} from "lucide-react";
import Dashboard from "../pages/dashboard/dashboard";
import Trips from "../pages/dashboard/trips";
import Expenses from "../pages/dashboard/expenses";
import Revenue from "../pages/dashboard/revenue";
import Account from "../pages/dashboard/account";
import App from "../App";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "", element: <Trips /> },
      { path: "expenses", element: <Expenses /> },
      { path: "revenue", element: <Revenue /> },
      { path: "account", element: <Account /> },
    ],
  },
]);
export default appRouter;

type ApplicationMenuType = {
  to: string | null;
  name: string | null;
  icon: React.ReactNode;
  match: string | null;
};
export const appMenu: ApplicationMenuType[] = [
  {
    to: "",
    name: "Trips",
    icon: <Bus className="h-6 w-6" />,
    match: "/dashboard",
  },
  {
    to: "expenses",
    name: "Expenses",
    icon: <BadgeIndianRupee className="h-6 w-6" />,
    match: "/dashboard/expenses",
  },
  {
    to: null,
    name: null,
    icon: <Plus className="h-18 w-18" strokeWidth={2.2} />,
    match: null,
  },
  {
    to: "revenue",
    name: "Revenue",
    icon: <ChartColumn className="h-6 w-6" />,
    match: "/dashboard/revenue",
  },
  {
    to: "account",
    name: "Account",
    icon: <SquareUserRound className="h-6 w-6" />,
    match: "/dashboard/account",
  },
];

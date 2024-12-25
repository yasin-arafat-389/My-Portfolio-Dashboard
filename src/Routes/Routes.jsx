import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import AdminRoute from "./AdminRoute";
import RestaurantHandlersRoute from "./RestaurantHandlersRoute";
import Orders from "../Pages/PartnerPages/Orders/Orders";
import CustomBurger from "../Pages/PartnerPages/CustomBurger/CustomBurger";
import AddNewFood from "../Pages/PartnerPages/AddNewFood/AddNewFood";
import MyFoods from "../Pages/PartnerPages/MyFoods/MyFoods";
import PrivateRoute from "./PrivateRoute";
import Overview from "../Components/Overview/Overview";
import Login from "../Pages/Login/Login";
import CreateOffer from "../Pages/PartnerPages/CreateOffer/CreateOffer";
import ManageCategories from "../Pages/AdminPages/ManageCategories/ManageCategories";
import ManageReviews from "../Pages/PartnerPages/ManageReviews/ManageReviews";
import ManageVendor from "../Pages/AdminPages/ManageVendor/ManageVendor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      // Admin routes
      {
        path: "/dashboard/overview",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },

      {
        path: "/admin/dashboard/manage-vendors",
        element: (
          <AdminRoute>
            <ManageVendor />
          </AdminRoute>
        ),
      },
      {
        path: "/admin/dashboard/manage-categories",
        element: (
          <AdminRoute>
            <ManageCategories />
          </AdminRoute>
        ),
      },

      // Restaurant handlers routes
      {
        path: "/dashboard/overview",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/orders",
        element: (
          <RestaurantHandlersRoute>
            <Orders />
          </RestaurantHandlersRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/custom-burger",
        element: (
          <RestaurantHandlersRoute>
            <CustomBurger />
          </RestaurantHandlersRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/add-new-food",
        element: (
          <RestaurantHandlersRoute>
            <AddNewFood />
          </RestaurantHandlersRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/my-foods",
        element: (
          <RestaurantHandlersRoute>
            <MyFoods />
          </RestaurantHandlersRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/create-offer",
        element: (
          <RestaurantHandlersRoute>
            <CreateOffer />
          </RestaurantHandlersRoute>
        ),
      },
      {
        path: "/restaurant/dashboard/reviews",
        element: (
          <RestaurantHandlersRoute>
            <ManageReviews />
          </RestaurantHandlersRoute>
        ),
      },
    ],
  },
]);

export default router;

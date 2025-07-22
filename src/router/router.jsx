import React from 'react';
import {
  createBrowserRouter,
} from "react-router";
import RootLayouts from '../layouts/RootLayouts';
import Register from '../Register/Register';
import Login from '../pages/Login/Login';
import Home from '../pages/Home';
import AddFood from '../pages/AddFood/AddFood';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import MyItems from '../Components/MyItems';
import PrivateRoute from '../PrivateRoute';

import Fridge from '../pages/Fridge/Fridge';
import Spinner from '../pages/loading';
import ErrorPage from '../pages/ErrorPage';
import AllExpiredFoods from '../pages/AllExpiredFoods/AllExpiredFoods';
import Support from '../pages/Support.jsx/Support';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    hydrateFallbackElement: <Spinner></Spinner>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/fridge',
        Component: Fridge,
      },
      {
        path: 'add-food',
        element:<PrivateRoute><AddFood></AddFood></PrivateRoute>
      },
      {
        path: '/foods/:id',
       element:<PrivateRoute><FoodDetails></FoodDetails></PrivateRoute>
      },
      {
        path:'/support',
        Component: Support
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path:'/allExpiredFoods',
        Component: AllExpiredFoods
      },
      {
        path: '/my-foods/:email',
        element: <PrivateRoute><MyItems></MyItems></PrivateRoute>
      },
    ]
  },
  {
        path: "/*",
        Component: ErrorPage
    }
]);

export default router;
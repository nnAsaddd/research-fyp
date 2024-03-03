import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SharedLayout,
  ProtectedRoutes,
  Error,
  Register,
  Login,
  Collections,
  CreateCollections,
  EditCollections,
  DeleteCollections,
} from "./pages";

// // Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as createCollectionsAction } from "./pages/CreateCollections";
import { action as editCollectionAction } from "./pages/EditCollections";
import { action as deleteCollectionAction } from "./pages/DeleteCollections";

// // Loaders
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as editCollectionLoader } from "./pages/EditCollections";
import { loader as deleteCollectionLoader } from "./pages/DeleteCollections";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SharedLayout />,
    // errorElement: <Error />,
    children: [
      // Protected Routes
      {
        element: <ProtectedRoutes />,
        children: [
          {
            index: true,
            element: <Collections />,
            loader: collectionsLoader,
          },
          {
            path: "/createCollections",
            element: <CreateCollections />,
            action: createCollectionsAction,
          },
          {
            path: "/editCollections/:id",
            element: <EditCollections />,
            loader: editCollectionLoader,
            action: editCollectionAction,
          },
          {
            path: "/deleteCollections/:id",
            element: <DeleteCollections />,
            loader: deleteCollectionLoader,
            action: deleteCollectionAction,
          },
        ],
      },

      // Non-Protected Routes
      {
        path: "/Register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/Login",
        element: <Login />,
        action: loginAction,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

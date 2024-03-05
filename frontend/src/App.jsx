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
  ResearchPapers,
  CreateResearchPapers,
  DeleteResearchPapers,
  EditResearchPapers,
} from "./pages";

// // Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as createCollectionsAction } from "./pages/CreateCollections";
import { action as editCollectionAction } from "./pages/EditCollections";
import { action as deleteCollectionAction } from "./pages/DeleteCollections";
import { action as editResearchPaperAction } from "./pages/EditResearchPapers";
import { action as deleteResearchPaperAction } from "./pages/DeleteResearchPapers";

// // Loaders
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as editCollectionLoader } from "./pages/EditCollections";
import { loader as deleteCollectionLoader } from "./pages/DeleteCollections";
import { loader as researchPapersLoader } from "./pages/ResearchPapers";
import { loader as editResearchPapersLoader } from "./pages/EditResearchPapers";
import { loader as deleteResearchPapersLoader } from "./pages/DeleteResearchPapers";

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
          {
            path: "/collections/:collectionId",
            element: <ResearchPapers />,
            loader: researchPapersLoader,
          },
          {
            path: "/collections/:collectionId/createResearchPapers",
            element: <CreateResearchPapers />,
          },
          {
            path: "/collections/:collectionId/editResearchPapers/:id",
            element: <EditResearchPapers />,
            loader: editResearchPapersLoader,
            action: editResearchPaperAction,
          },
          {
            path: "/collections/:collectionId/deleteResearchPapers/:id",
            element: <DeleteResearchPapers />,
            loader: deleteResearchPapersLoader,
            action: deleteResearchPaperAction,
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

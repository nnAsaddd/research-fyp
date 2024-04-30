import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SharedLayout,
  ProtectedRoutes,
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
  Comments,
  CreateComments,
  EditComment,
  DeleteComment,
  ResetPassword,
  ChangePassword,
  ForgotPassword,
  ExploreCollections,
  ExploreResearchPapers,
  ExploreComments,
  CreateQuery,
  GetAllUsers,
  GetAllQueries,
  ExploreCreateComments,
} from "./pages";

// // Actions
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { action as createCollectionsAction } from "./pages/CreateCollections";
import { action as createQueryAction } from "./pages/CreateQuery";
import { action as editCollectionAction } from "./pages/EditCollections";
import { action as deleteCollectionAction } from "./pages/DeleteCollections";
import { action as editResearchPaperAction } from "./pages/EditResearchPapers";
import { action as deleteResearchPaperAction } from "./pages/DeleteResearchPapers";
import { action as createCommentAction } from "./pages/CreateComments";
import { action as exploreCreateCommentsAction } from "./pages/ExploreCreateComments";
import { action as editCommentsAction } from "./pages/EditComment";
import { action as deleteCommentsAction } from "./pages/DeleteComment";
exploreCreateCommentsAction;
//  Loaders
import { loader as collectionsLoader } from "./pages/Collections";
import { loader as exploreCollectionsLoader } from "./pages/ExploreCollections";
import { loader as getAllUsersLoader } from "./pages/GetAllUsers";
import { loader as getAllQueriesLoader } from "./pages/GetAllQueries";
import { loader as editCollectionLoader } from "./pages/EditCollections";
import { loader as deleteCollectionLoader } from "./pages/DeleteCollections";
import { loader as researchPapersLoader } from "./pages/ResearchPapers";
import { loader as exploreResearchPapersLoader } from "./pages/ExploreResearchPapers";
import { loader as editResearchPapersLoader } from "./pages/EditResearchPapers";
import { loader as deleteResearchPapersLoader } from "./pages/DeleteResearchPapers";
import { loader as commentsLoader } from "./pages/Comments";
import { loader as exploreCommentsLoader } from "./pages/ExploreComments";
import { loader as editCommentsLoader } from "./pages/EditComment";
import { loader as deleteCommentsLoader } from "./pages/DeleteComment";

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
            path: "/exploreCollections",
            element: <ExploreCollections />,
            loader: exploreCollectionsLoader,
          },
          {
            path: "/createCollections",
            element: <CreateCollections />,
            action: createCollectionsAction,
          },
          {
            path: "/getAllUsers",
            element: <GetAllUsers />,
            loader: getAllUsersLoader,
          },

          {
            path: "/getAllQueries",
            element: <GetAllQueries />,
            loader: getAllQueriesLoader,
          },
          {
            path: "/createQuery",
            element: <CreateQuery />,
            action: createQueryAction,
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
            path: "/exploreCollections/:collectionId",
            element: <ExploreResearchPapers />,
            loader: exploreResearchPapersLoader,
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
          {
            path: "/collections/:collectionId/researchPapers/:id",
            element: <Comments />,
            loader: commentsLoader,
          },
          {
            path: "/exploreCollections/:collectionId/exploreResearchPapers/:id",
            element: <ExploreComments />,
            loader: exploreCommentsLoader,
          },
          {
            path: "/exploreCollections/:collectionId/exploreResearchPapers/:id/createComments",
            element: <ExploreCreateComments />,
            action: exploreCreateCommentsAction,
          },
          {
            path: "/collections/:collectionId/researchPapers/:id/createComments",
            element: <CreateComments />,
            action: createCommentAction,
          },
          {
            path: "/collections/:collectionId/researchPapers/:researchPaperId/editComments/:id",
            element: <EditComment />,
            loader: editCommentsLoader,
            action: editCommentsAction,
          },
          {
            path: "/collections/:collectionId/researchPapers/:researchPaperId/deleteComments/:id",
            element: <DeleteComment />,
            loader: deleteCommentsLoader,
            action: deleteCommentsAction,
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
      {
        path: "/forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "/resetPassword",
        element: <ResetPassword />,
      },
      {
        path: "/changePassword",
        element: <ChangePassword />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

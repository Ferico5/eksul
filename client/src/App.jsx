import { createBrowserRouter, RouterProvider, Outlet, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import pages
import StudentsLogin from '../pages/students/StudentsLogin';
import StudentsDashboard from '../pages/students/StudentsDashboard';
import StudentsEksulDetail from '../pages/students/StudentsEksulDetail';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminAttendanceList from '../pages/admin/AdminAttendanceList';
import AdminEksulMember from '../pages/admin/AdminEksulMember';
// import ServerError from '../pages/ServerError';
// import PageNotFound from '../pages/PageNotFound';

// import components
import Header from '../components/Header';
import ProtectedRoute from '../components/admin/ProtectedRoute';

// Import context
import { AuthProvider } from '../auth/AuthContext';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const NoHeaderLayout = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/student',
    children: [
      {
        path: 'login',
        element: <NoHeaderLayout />,
        children: [{ index: true, element: <StudentsLogin /> }],
      },
      {
        element: <Layout />,
        children: [
          {
            path: 'dashboard',
            element: <StudentsDashboard />,
          },
          {
            path: 'eksul/:id',
            element: <StudentsEksulDetail />,
          },
        ],
      },
      // {
      //   path: '/server-error',
      //   element: (
      //     // <ProtectedRoute>
      //       <ServerError />
      //     // </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: '*',
      //   element: <PageNotFound />,
      // },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        path: 'login',
        element: <NoHeaderLayout />,
        children: [{ index: true, element: <AdminLogin /> }],
      },
      {
        element: <Layout />,
        children: [
          {
            path: 'dashboard',
            element: (
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: 'attendance/:id_eksul',
            element: (
              <ProtectedRoute>
                <AdminAttendanceList />
              </ProtectedRoute>
            ),
          },
          {
            path: 'eksul_members/:id_eksul',
            element: (
              <ProtectedRoute>
                <AdminEksulMember />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // {
      //   path: '/server-error',
      //   element: (
      //     // <ProtectedRoute>
      //       <ServerError />
      //     // </ProtectedRoute>
      //   ),
      // },
      // {
      //   path: '*',
      //   element: <PageNotFound />,
      // },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={6000} hideProgressBar={false} />
      </AuthProvider>
    </div>
  );
};

export default App;

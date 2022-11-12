import { createBrowserRouter } from 'react-router-dom';
import Main from '../../Layouts/Main/Main';
import CheckOut from '../../Pages/CheckOut/CheckOut';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import Orders from '../../Pages/Orders/Orders';
import Register from '../../Pages/Register/Register';
import PrivateRouters from '../PrivateRouters/PrivateRouters';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
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
        path: '/checkOut/:id',
        element: <PrivateRouters><CheckOut></CheckOut></PrivateRouters>,
        loader: ({ params }) => fetch(`https://genius-car-server-six-olive.vercel.app/services/${params.id}`)
      },
      {
        path: '/orders',
        element: <Orders></Orders>
      }
    ]
  }
])

export default router;
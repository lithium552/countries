import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Root } from './routes/Root';
import { MainPage } from './routes/MainPage';
import Country from './routes/Country';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <MainPage/>,
        loader: async ({request}) => {
          const url = new URL(request.url);
          console.log(url)
          const q = url.searchParams.get("q");
          if (q) return fetch(`https://restcountries.com/v3.1/name/${q}`)
          return fetch('https://restcountries.com/v3.1/all')
        },
        errorElement: <div>Oops!</div>
      },
      {
        path: '/:country',
        element: <Country/>,
        loader: async ({params}) => {
          return fetch(`https://restcountries.com/v3.1/name/${params.country}`)
        }
      },
      {
        path: '/regions/:region',
        element: <MainPage/>,
        loader: async ({params, request}) => {
          const url = new URL(request.url);
          console.log(url)
          const q = url.searchParams.get("q");
          if (q) return fetch(`https://restcountries.com/v3.1/name/${q}`)
          return fetch(`https://restcountries.com/v3.1/region/${params.region}`)
        }
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)

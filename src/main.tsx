import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { Root } from './routes/Root';
import { MainPage } from './routes/MainPage';
import Country from './routes/Country';
import { MainPageWithPagination } from './routes/MainPageWithPagination'

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
          const q = url.searchParams.get("q");
          console.log(q)
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
          console.log(params)
          const q = url.searchParams.get("q");
          if (q) return fetch(`https://restcountries.com/v3.1/name/${q}`)
          return fetch(`https://restcountries.com/v3.1/region/${params.region}`)
        }
      },
      {
        path: '/pages/',
        element: <MainPageWithPagination />,
        loader: async ({params, request}) => {
          // if (!params) console.log('HELLO')
          const response = await fetch('https://restcountries.com/v3.1/all')
          const res = await response.json()
          console.log(res, params, request)
          return fetch('https://restcountries.com/v3.1/all')
        }
      },
      {
        path: '/pages/:page',
        element: <MainPageWithPagination />,
        loader: async ({params, request}) => {
          // if (!params) console.log('HELLO')
          const response = await fetch('https://restcountries.com/v3.1/all')
          const res = await response.json()
          console.log(res, params, request)
          return fetch('https://restcountries.com/v3.1/all')
        }
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>,
)

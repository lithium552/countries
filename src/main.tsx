import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom"
import { Root } from './routes/Root';
import { MainPage } from './routes/MainPage';
import Country from './routes/Country';
import { MainPageWithPagination } from './routes/MainPageWithPagination'
import { Data } from './types';
import ErorrElement from './ErorrElement';

const pagesArr = (res : Data[]) => {
  const arr = []
  let startIndex = 0
  let index = 12
  for (let i = 0; i < Math.ceil(res.length / 12); i++) {
    arr.push({ startIndex, index })
    startIndex = index
    index = index + 12
  }
  return arr
}

const router = createBrowserRouter([
  {
    path: "/countries",
    element: <Root />,
    children: [
      {
        path: "/countries",
        element: <MainPage />,
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const q = url.searchParams.get("q");
          if (q) return fetch(`https://restcountries.com/v3.1/name/${q}`)
          return fetch('https://restcountries.com/v3.1/all')
        },
        errorElement: <ErorrElement />
      },
      {
        path: '/countries/:country',
        element: <Country />,
        loader: async ({ params }) => {
          return fetch(`https://restcountries.com/v3.1/name/${params.country}`)
        }
      },
      {
        path: '/countries/regions/:region',
        element: <MainPage />,
        loader: async ({ params, request }) => {
          const url = new URL(request.url);
          const q = url.searchParams.get("q");
          if (q) return fetch(`https://restcountries.com/v3.1/name/${q}`)
          return fetch(`https://restcountries.com/v3.1/region/${params.region}`)
        }
      },
      {
        path: '/countries/pages/:region',
        element: <MainPageWithPagination />,
        loader: async ({ params, request }) => {
          const url = new URL(request.url);
          const page = url.searchParams.get("page")
          const q = url.searchParams.get("q")
          if (q) return redirect(`/countries/?q=${q}`)
          const { region } = params
          if (region) {
            const response = await fetch(`https://restcountries.com/v3.1/region/${region}`)
            const res = await response.json()
            const arr = pagesArr(res)
            if (!page) return { data: res.slice(arr[0].startIndex, arr[0].index), dataLength: res.length }
            else if (page) return { data: res.slice(arr[Number(page) - 1].startIndex, arr[Number(page) - 1].index), dataLength: res.length }
          }
        },
      },
        {
          path: '/countries/pages/all',
          element: <MainPageWithPagination />,
          loader: async ({params, request}) => {
            const url = new URL(request.url);
            const page = url.searchParams.get("page")
            const q = url.searchParams.get("q")
            if (q) return redirect(`/countries/?q=${q}`)
            const response = await fetch('https://restcountries.com/v3.1/all')
            const res = await response.json()
            const arr = pagesArr(res)
            if (!page) return { data: res.slice(arr[0].startIndex, arr[0].index), dataLength: res.length }
            else if (page) return { data: res.slice(arr[Number(page) - 1].startIndex, arr[Number(page) - 1].index), dataLength: res.length }
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

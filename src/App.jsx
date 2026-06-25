import React from 'react'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Form from './Components/Form'
import Docs from './Components/Docs'
import Footer from './Components/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <div className='m-auto max-w-[70ch] w-full px-4 flex flex-col justify-center min-h-screen gap-y-8'>
            <Header heading="upload pdf" />
            <Form />
          </div>
          <Footer/>
        </>
      )
    },
    {
      path: '/docs',
      element: (
        <>
          <Navbar />
          <div className='m-auto max-w-[70ch] flex flex-col w-full px-4 min-h-screen gap-y-8'>
            <Docs />
          </div>
          <Footer />
        </>
      )
    }
  ])

  return <RouterProvider router={router} />
}

export default App

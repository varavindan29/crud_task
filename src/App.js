import logo from './logo.svg';
import './App.scss';
import { Header } from './layout'
import { UserPage } from './pages'

import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";




function App() {


  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Header/>,
  //     // loader: rootLoader,
  //     children: [
  //       {
  //         path: "team",
  //         element:<UserPage/>,
  //         // loader: teamLoader,
  //       },
  //     ],
  //   },
  // ]);


  return (
    <>
      <Header />
      <div className='container mt-5'>
        <UserPage />
      </div>

    </>

  );
}

export default App;

import { Home } from "@/Main/pages/home";
import {ReactElement} from "react";
import {Route, Routes} from "react-router-dom";


export const AppRouter = (): ReactElement => {


  return (
    <Routes>
      <Route path="/" element={<Home/>}/>

    </Routes>
  )
}
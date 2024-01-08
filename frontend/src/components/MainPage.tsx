import { Route, Routes } from "react-router-dom"
import { NavBar } from "./NavBar"
import { Login } from "./Login"
import { Signup } from "./Signup"
import Home from "./Home"

export default function MainPage() {
  return (
    <>
      <div className="md:hidden">
      </div>
      <div className="hidden md:block">
        <NavBar />
        <div className="border-t">
          <div className="bg-background">
            <div className="flex items-center justify-center ">
              <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/signup" element={ <Signup /> } />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

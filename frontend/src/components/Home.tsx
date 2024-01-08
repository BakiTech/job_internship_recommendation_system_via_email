import { SideBar } from "./SideBar"
import { CareerTable } from "./CareerTable"
import { Button } from "./ui/button"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./Dashboard"
export default function Home() {
  return (
    <>
      <SideBar className="ml:0 lg:block w-48 border-r" />
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <Routes>
              <Route path="/" element={ <CareerTable /> } />
              <Route path="/dashboard" element={ <Dashboard /> } />
          </Routes>
        </div>
      </div>
    </>
  )
}

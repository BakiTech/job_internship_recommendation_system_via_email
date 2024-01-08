import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from "./ui/button"
import { CareerDialog } from "./CareerDialog"
  
  const careers = [
    {
      id: "1",
      type: "Internship",
      title: "Data Scientist",
      location: "France",
    },
    {
      id: "2",
      type: "Internship",
      title: "Data Analyst",
      location: "France",
    },
  ]
  
  export function CareerTable() {
    return (
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Careers List</h2>
          </div>
          <div className="flex items-center space-x-2">
            <CareerDialog/>
          </div>
        </div>
        <Table>
          <TableCaption>A list of the recent Careers you searched for.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {careers.map((career) => (
              <TableRow key={career.id}>
                <TableCell>{career.title}</TableCell>
                <TableCell>{career.type}</TableCell>
                <TableCell className="text-right">{career.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
        </div>
    )
  }
  
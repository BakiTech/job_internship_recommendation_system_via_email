import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { FileEdit } from "lucide-react"

const formSchema = z.object({
    type: z
    .string(),
    title: z
    .string(),
    location: z
    .string(),

})


export function CareerDialog( ) {
  const [open, setOpen] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues : {
        type: "",
        title: "",
        location: "",
      }
    
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

  }

  return (
    <Dialog open={open} onOpenChange={
      (open) => {
        setOpen(open)
        form.clearErrors()
        form.reset()
      }
    }>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Career Search</Button>  
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]" onPointerDownOutside={(event: any) => { event.preventDefault() }}>
        <DialogHeader>
            <DialogTitle>Add Career Search</DialogTitle>
            <DialogDescription>
                  What are your preferences
            </DialogDescription>
            
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Location</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-x-4">
                  <FormLabel className="text-right">Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"1"}>Job</SelectItem>
                      <SelectItem value={"2"}>Intership</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="col-start-2 col-span-3"/>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
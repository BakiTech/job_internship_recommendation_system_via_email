import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { toast } from "./ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Link } from "react-router-dom"

const formSchema = z.object({
    name: z.string().min(3, {message: 'Name must be at least 3 characters'}),
    email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
    password: z.string().min(6, {message: 'Password must be at least 6 characters'}),
    confirmPassword: z.string().min(6, {message: 'Password must be at least 6 characters'})
  }).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords does not match'
  })

export function Signup() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          'name': '',
          'email': '',
          'password': '',
          'confirmPassword': ''
        }
        
      })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(data, null, 2)}</code>
              </pre>
            ),
        })
    }

  return (
    <div className="h-full flex items-center justify-center mt-[7em]">
      <Card className="w-[350px]">
      <Form {...form}>
          <form onSubmit={form.handleSubmit( onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle> Signup </CardTitle>
              <CardDescription>Please Enter All Your Informations to Signup</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                      <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                      <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passsword</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="***********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="***********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
              />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit">Signup</Button>
                <Link to="/Login">Login</Link>
              </CardFooter>
            </form>
          </Form>
      </Card>
    </div>
  )
}

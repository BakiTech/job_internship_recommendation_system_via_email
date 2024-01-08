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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Link } from "react-router-dom"
import { login } from "@/actions/auth"

const formSchema = z.object({
  email: z.string().min(1, {message: 'Email is required'}).email('Invalid email address'),
  password: z.string().min(6, {message: 'Password must be at least 6 characters'})
})

export function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          'email': '',
          'password': ''
        }
        
      })

    function onSubmit( data: z.infer<typeof formSchema>) {
      
      login( data.email, data.password)
    }

  return (
    <div className="h-full flex items-center justify-center mt-[10em]">
      <Card className="w-[350px]">
        <Form {...form}>
          <form  onSubmit={ form.handleSubmit( onSubmit)} className="space-y-8">
            <CardHeader>
              <CardTitle> Login </CardTitle>
              <CardDescription>Please Enter Email and Password to Login</CardDescription>
            </CardHeader>
            <CardContent>
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
                        <Input type="password" placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
              />
              
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Login</Button>
              <Link to="/Signup">Signup</Link>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

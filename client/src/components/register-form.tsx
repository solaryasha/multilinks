import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from 'react'
import { signup } from '@/app/login/actions'

export function RegisterForm() {
  const state = { errors: {}, message: ''};
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {}
  return (
    <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" required />
              {state?.errors?.email && (
                <p className="text-sm text-red-500">{state.errors.email[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">{state.errors.password[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Confirm password</Label>
              <Input id="password" name="password" type="password" required />
              {state?.errors?.password && (
                <p className="text-sm text-red-500">{state.errors.password[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting} formAction={signup}>
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </Button>
          </CardFooter>
        </form>
        {state?.success && (
          <Alert className="mt-4">
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
      </Card>
  )
}
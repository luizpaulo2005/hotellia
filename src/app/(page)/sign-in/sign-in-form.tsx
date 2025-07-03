import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const SignInForm = () => {
  return (
    <form className="w-full max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Access your workspace</h1>
      <Label>E-mail</Label>
      <Input type="email" placeholder="email@example.com" />
      <Label>Password</Label>
      <Input type="password" placeholder="••••••••" />
      <Button className="w-full">Sign in</Button>
    </form>
  )
}

export { SignInForm }

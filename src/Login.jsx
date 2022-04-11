import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './components/Button'
import { signInWithGoogle } from './firebase'
import { useUser } from './store'

export default function Login() {
  const navigate = useNavigate()
  let location = useLocation()
  const { user } = useUser()
  let from = location.state?.from?.pathname || '/'

  useEffect(() => {
    user && user !== 'Guest' && navigate(from, { replace: true })
  }, [user])

  const signIn = async () => {
    await signInWithGoogle()
  }

  return (
    <div className="w-3/12 min-w-[22rem] min-h-screen flex flex-col items-center justify-center mx-auto gap-4">
      <h2 className="text-6xl text-white font-medium">Login</h2>
      <div className="bg-gray-800 p-8 w-full flex flex-col h-auto gap-4 rounded-md">
        <Button
          className="bg-white text-red-500"
          text="Sign in with google"
          onClick={signIn}
        />
        <Button className="bg-red-500" text="Sign in with email" />
        <small className="text-center text-gray-400">
          By continuing, you are indicating that you accept our Terms of Service
          and Privacy Policy.
        </small>
      </div>
      <Button
        className="bg-gray-500"
        text="GO BACK"
        onClick={() => {
          navigate(-1)
        }}
      />
    </div>
  )
}

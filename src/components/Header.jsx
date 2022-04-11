import Button from './Button'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import capitalize from '../utils'
import { useUser } from '../store'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import logo from '../assets/logo.png'

export default function Header() {
  const location = useLocation()
  const noTitle = ['/', '/login']
  const [url, setUrl] = useState('')
  const { user } = useUser()
  const pageTitle = () => {
    if (location.pathname.includes('lists/')) return 'Shopping List'
    return location.pathname
      .split('/')
      .map((word) => capitalize(word))
      .join(' ')
  }
  useEffect(() => {
    setUrl(location.pathname)
  }, [location.pathname])

  return (
    <div className="shadow-xl header bg-gray-800 h-16 w-full flex items-center justify-between px-4 relative">
      <div className="">
        <Link to={'/'} className="flex items-center w-auto">
          <img src={logo} className="max-w-[4rem]" alt="Hepilo Replica" />
          <h4 className="text-2xl sm:text-4xl text-white">Hepilo</h4>
        </Link>
      </div>
      {!noTitle.includes(url) && (
        <h1 className="text-4xl w-auto font-light text-white">{pageTitle()}</h1>
      )}
      {user === 'Guest' ? (
        <Link to={'/login'}>
          <Button className="bg-blue-500" text="GET STARTED" />
        </Link>
      ) : (
        <Button
          onClick={() => signOut(auth)}
          className="bg-blue-500"
          text="Sign Out"
        />
      )}
    </div>
  )
}

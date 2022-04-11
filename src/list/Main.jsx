import { Navigate, Outlet, useLocation } from 'react-router-dom'
import NotLoggedIn from './NotLoggedIn'
import Sidemenu from './Sidemenu'
import { useStore, useUser } from '../store'
import Form from '../components/Form'
import { useEffect, useRef } from 'react'
import { colRef } from '../firebase'
import { onSnapshot } from 'firebase/firestore'

export function ProtectedRoute() {
  const { user } = useUser()
  const location = useLocation()

  if (user && user !== 'Guest') {
    return <Main />
  }

  return user && user === 'Guest' ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <div>Fetching User</div>
  )
}
export default function Main() {
  const { form, dispatch, state } = useStore()
  const { user } = useUser()
  let unsubCat = useRef()
  let unsubItems = useRef()
  let unsubLists = useRef()

  useEffect(() => {
    console.log('Main was mounted')
    unsubCat.current = onSnapshot(colRef('categories'), (snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      dispatch({
        type: 'FETCH',
        payload: { collection: 'categories', docs: docs }
      })
    })

    setTimeout(() => {
      unsubItems.current = onSnapshot(colRef('items'), (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })
        dispatch({
          type: 'FETCH',
          payload: { collection: 'items', docs: docs }
        })
      })
    }, 200)

    setTimeout(() => {
      unsubLists.current = onSnapshot(colRef('lists'), (snapshot) => {
        const docs = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        })

        dispatch({
          type: 'FETCH',
          payload: { collection: 'lists', docs: docs }
        })
      })
    }, 400)

    return () => {
      console.log('we are in the main return')
      unsubLists?.current?.()
      unsubCat?.current?.()
      unsubItems?.current?.()
    }
  }, [])

  return (
    <main className="w-full flex">
      <Sidemenu />
      <div className="p-[20%] py-4 w-full basis-auto mx-auto flex flex-col gap-6 relative">
        {user === 'Guest' && <NotLoggedIn />}
        <Outlet />
        {form && (
          <Form type={form.type} edit={form?.edit} itemData={form?.itemData} />
        )}
      </div>
    </main>
  )
}

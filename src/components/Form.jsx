import { serverTimestamp } from 'firebase/firestore'
import React, { createContext, useEffect, useRef, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { createDoc, editDoc, fetchCol } from '../firebase'
import { useStore } from '../store'
import Button from './Button'
import InputField from './InputField'

export const formContext = createContext(null)

const editListItem = (item, state) => {
  const list = state.lists.filter((list) => list.id === item.listId)
  const listItems = list[0].listItems.map((listItem) => {
    if (item.id === listItem.id) {
      const { listId, ...rest } = item
      return rest
    } else {
      return listItem
    }
  })

  const data = { ...list[0], listItems: listItems }
  editDoc('lists', item.listId, data)
}
const handleSubmit = async (type, formData, closeForm, state) => {
  let data = {}
  let collection = ''
  if (type === 'category') {
    collection = 'categories'
    data = {
      ...formData,
      items: []
    }
  } else if (type === 'listItem') {
    editListItem(formData, state)
    closeForm()
    return
  } else {
    collection = type + 's'
    data = {
      ...formData,
      createAt: serverTimestamp()
    }
    if (collection === 'lists') {
      data.listItems = []
      data.cart = []
    }
  }

  if (formData.id) {
    const { id, ...rest } = data
    data = rest
    editDoc(collection, id, data)
  } else {
    createDoc(collection, data)
  }

  closeForm()
}

export default function Form({ type, edit, itemData }) {
  const { setForm, state } = useStore()
  let formTitle = type || 'Item'
  const [formData, setFormData] = useState(null)
  const modal = useRef(null)
  const param = useParams()

  if (edit && !formData) {
    if (type === 'listItem') itemData = { ...itemData, listId: param.id }
    setFormData(itemData)
  }
  useEffect(() => {
    window.addEventListener('click', closeForm)
  }, [])

  const switchForm = () => {
    switch (type) {
      case 'category':
        return <NewCatForm />
      case 'list':
        return <NewListForm />
      case 'listItem':
        return <ListItemForm />
      default:
        return <NewItemForm />
    }
  }

  const closeForm = () => {
    setForm(null)
  }
  useEffect(() => {
    return () => {
      window.removeEventListener('click', closeForm)
      setFormData(null)
    }
  }, [])

  return (
    <formContext.Provider value={{ edit, formData, setFormData }}>
      <div
        ref={modal}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 p-4 rounded-md flex flex-col justify-center items-center w-[55%] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex w-full justify-between items-center">
          <h3 className="font-medium text-2xl">
            {edit ? 'Editing' : 'Create New'} {formTitle}
          </h3>
          <FaTimes
            onClick={closeForm}
            className="text-blue-500 text-xl cursor-pointer font-semibold"
          />
        </div>
        <div className="w-full">
          <form>
            {switchForm()}
            <div className="flex justify-between items-center w-full">
              <Button
                className="bg-transparent font-bold text-green-500 hover:bg-green-200"
                text="SAVE"
                onClick={() => handleSubmit(type, formData, closeForm, state)}
              />
              <Button
                type="button"
                className="bg-transparent font-bold text-blue-500 hover:bg-blue-200"
                text="CANCEL"
                onClick={closeForm}
              />
            </div>
          </form>
        </div>
      </div>
    </formContext.Provider>
  )
}

function NewCatForm() {
  const colors = ['red', 'green', 'lime', 'pink', 'yellow', 'blue']

  return (
    <>
      <InputField name="name" type="text" />
      <InputField name="color" type="select" data={colors} />
    </>
  )
}

function NewItemForm() {
  const { state } = useStore()
  const [cat, setCat] = useState([])

  if (state?.categories && cat.length === 0) {
    setCat(state.categories.map((cat) => cat.name))
  }

  const units = [
    'kg',
    'gallons',
    'piece',
    'bag',
    'cup',
    'bottle',
    'box',
    'crate'
  ]
  return (
    <>
      <InputField name="name" type="text" />
      <InputField name="price" type="number" />
      <InputField name="category" type="select" data={cat} />
      <InputField name="unit" type="select" data={units} />
    </>
  )
}

function ListItemForm() {
  const { state } = useStore()
  const [cat, setCat] = useState([])

  if (state?.categories && cat.length === 0) {
    setCat(state.categories.map((cat) => cat.name))
  }

  const units = [
    'kg',
    'gallons',
    'piece',
    'bag',
    'cup',
    'bottle',
    'box',
    'crate'
  ]
  return (
    <>
      <InputField name="name" type="text" />
      <InputField name="unit" type="select" data={units} />
      <InputField name="quantity" type="number" />
      <InputField name="price" type="number" />
      <InputField name="category" type="select" data={cat} />
    </>
  )
}

function NewListForm() {
  const icons = ['List', 'Work', 'Fitness']
  return (
    <>
      <InputField name="name" type="text" />
      <InputField name="icon" type="select" data={icons} />
    </>
  )
}

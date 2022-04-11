import { useState, useEffect } from 'react'
import { BiEdit } from 'react-icons/bi'
import { BsFillSquareFill, BsListTask } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import { delDoc } from '../firebase'
import { useStore } from '../store'

export default function Manage({ name }) {
  const location = useLocation()
  const [listItems, setListItems] = useState(null)
  const { setForm, state } = useStore()
  const deleteItem = (id) => {
    delDoc(name, id)
  }

  let type =
    name === 'categories' ? name.replace('ies', 'y') : name.slice(0, -1)
  useEffect(() => {
    if (state?.[name]) {
      const items = state?.[name]?.map((listItem) => {
        return (
          <ManageListItem
            key={listItem.id}
            item={listItem}
            itemType={type}
            deleteItem={deleteItem}
          />
        )
      })
      items && setListItems(items)
    }
  }, [state, name])

  return (
    <>
      <div className="flex items-center justify-end w-full">
        {location.pathname === '/manage/items' && (
          <div className="w-full">
            <input
              className="p-2"
              type="search"
              name="item"
              id="SearchItem"
              placeholder="Search Items"
            />
          </div>
        )}
        <Button
          onClick={(e) => {
            e.stopPropagation()
            setForm({ type: type })
          }}
          text={'Add ' + type}
          className=" basis-[30%] bg-blue-500 w-40"
        />
      </div>
      <div className="bg-gray-800 py-4">{listItems}</div>
    </>
  )
}

function ManageListItem({ item, itemType, handleAction, deleteItem }) {
  const { setForm } = useStore()
  let icon
  let classes = 'text-4xl'

  function handleAction(e, action) {
    e.preventDefault()
    e.stopPropagation()
    if (action === 'edit') {
      setForm({ type: itemType, edit: true, itemData: { ...item } })
    } else {
      deleteItem(item.id)
    }
  }

  if (itemType === 'category') {
    classes += ` text-${item.color.toLowerCase()}-500`
    icon = <BsFillSquareFill className={classes} />

    console.log(classes)
  } else {
    icon = <BsListTask className={classes} />
  }
  return (
    <div
      onClick={() =>
        setForm({ type: itemType, edit: true, itemData: { ...item } })
      }
      className="flex cursor-pointer justify-between items-center p-3 px-2 w-full hover:bg-gray-600"
    >
      <div className="basis-4/5 flex items-center gap-8">
        {itemType !== 'item' && icon}
        <div className="flex flex-col justify-center gap-y-1">
          <h3 className="">{item.name}</h3>
          <small className="leading-none text-gray-400 text-sm">
            {itemType !== 'item' ? (
              0 + ' items'
            ) : (
              <>
                <span>{item.category} - </span>
                <span>FCFA {item.price}</span>
              </>
            )}
          </small>
        </div>
      </div>
      <div className="basis-1/5 flex items-center gap-8">
        <span onClick={(e) => handleAction(e, 'edit')} data-name="edit">
          <BiEdit className="text-2xl text-blue-500" />
        </span>
        <span onClick={(e) => handleAction(e, 'delete')}>
          <MdDelete className="text-red-600 text-2xl" />
        </span>
      </div>
    </div>
  )
}

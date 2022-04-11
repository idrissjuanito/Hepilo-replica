import { useCallback, useEffect, useRef, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { editDoc, fetchDoc } from '../firebase'
import { useStore } from '../store'

export default function ShoppingList() {
  const { state } = useStore()
  const param = useParams()

  const AddItemToList = useCallback(
    (e) => {
      if (e.code === 'Enter' || e.key === 'Unidentified') {
        const [item] = state.items.filter((item) => {
          return item.name === e.target.value
        })
        const listItem = {
          id: item.id,
          quantity: 1,
          ...item
        }

        fetchDoc('lists', param.id)
          .then((doc) => {
            const listItems = [...doc.data().listItems, listItem]
            const data = { ...doc.data(), listItems: listItems }
            return editDoc('lists', param.id, data)
          })
          .then(() => {
            console.log('Item added successfully')
            e.target.value = ''
          })
          .catch((err) =>
            console.log('An error occur while adding the item ' + err.message)
          )
      }
    },
    [state, param]
  )

  const itemList = state?.items?.map((item) => {
    return <option key={item.id} value={item.name} />
  })

  return (
    <>
      <div className="w-full flex justify-between bg-gray-800 p-4 rounded-md">
        <input
          onKeyUp={AddItemToList}
          list="items-list"
          name="addItem"
          id="addItem"
          placeholder="Add Item"
          className=" bg-transparent cur w-full outline-none border-0"
        />
        <datalist id="items-list">{itemList}</datalist>
      </div>
      <List />
    </>
  )
}

function List() {
  const [listTotal, setListTotal] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const { state } = useStore()
  const [list, setList] = useState()
  const [listItems, setListItems] = useState([])
  const [cart, setCart] = useState([])
  const param = useParams()
  const [groupedItems, setgroupedItems] = useState([])

  useEffect(() => {
    groupByCategory()
  }, [listItems])

  useEffect(() => {
    let items = state?.lists?.filter((item) => item.id === param.id)
    if (items) {
      ;[items] = items
      setList(items)
      setListItems(items?.listItems)
      setCart(items?.cart)
    }
  }, [state, param])

  const removeItem = useCallback(
    (e, id, container) => {
      e.stopPropagation()
      const listItms = list?.[container]?.filter((item) => item.id !== id)
      const data = { ...list, [container]: listItms }
      editDoc('lists', param.id, data)
    },
    [list, param]
  )

  const addToCart = (item, container) => {
    const source = container === 'cart' ? cart : listItems
    const newList = source.filter((it) => item.id !== it.id)

    const swapped =
      container === 'cart'
        ? { cart: newList, listItems: [...listItems, item] }
        : { listItems: newList, cart: [...cart, item] }

    setTimeout(() => {
      editDoc('lists', param.id, {
        ...list,
        ...swapped
      })
    }, 500)
  }

  const groupByCategory = useCallback(() => {
    const groupAndSumPrices = listItems.reduce(
      (prev, current) => {
        const { category, price, quantity } = current
        let [cat, listP] = prev
        const item = (
          <ListItem
            item={current}
            key={current.id}
            removeItem={removeItem}
            addToCart={addToCart}
            container={'listItems'}
          />
        )
        listP += Number(price) * Number(quantity)
        !(category in cat) ? (cat[category] = [item]) : cat[category].push(item)

        return [cat, listP]
      },
      [{}, 0]
    )
    const [items, listPrices] = groupAndSumPrices
    setListTotal(listPrices)

    const groupedItems = []
    for (let i in items) {
      groupedItems.push(
        <ul className="py-2" key={i}>
          <h2 className="px-6 text-lime-400">{i}</h2>
          {[...items[i]]}
        </ul>
      )
    }
    setgroupedItems(groupedItems)
  }, [listItems])

  return (
    <>
      <div className=" bg-gray-800 py-4">
        {groupedItems.length === 0 ? 'List is empty' : groupedItems}
      </div>
      <Cart
        cart={cart}
        removeItem={removeItem}
        addToCart={addToCart}
        setCartTotal={setCartTotal}
      />
      <Total listTotal={listTotal} cartTotal={cartTotal} />
    </>
  )
}

function ListItem({ item, removeItem, addToCart, container }) {
  const { setForm } = useStore()

  return (
    <li
      onClick={() => setForm({ type: 'listItem', itemData: item, edit: true })}
      className="cursor-pointer flex justify-between items-center p-2 px-6 w-full hover:bg-gray-600"
    >
      <div className="basis-1/2 text-white flex items-center gap-8">
        <input
          onChange={() => addToCart(item, container)}
          type="checkbox"
          name="Item"
          checked={container === 'cart' && true}
          id={item.id}
        />
        <div className="flex flex-col justify-center">
          <h3 className="">
            {item.name} ({item.quantity} {item.unit})
          </h3>
          <small className="leading-none">
            FCFA {Math.round(Number(item.price) * Number(item.quantity))}
          </small>
        </div>
      </div>
      <MdDelete
        onClick={(e) => removeItem(e, item.id, container)}
        className="text-red-600 text-2xl"
      />
    </li>
  )
}

function Cart({ cart, removeItem, addToCart, setCartTotal }) {
  const cartItems = useRef([])

  useEffect(() => {
    let total = 0
    const items = cart?.map((item) => {
      total += Number(item.price) * Number(item.quantity)
      return (
        <ListItem
          item={item}
          key={item.id}
          container={'cart'}
          removeItem={removeItem}
          addToCart={addToCart}
        />
      )
    })
    cartItems.current = items
    setCartTotal(total)
  }, [cart])

  return (
    <div className=" bg-gray-800 py-4">
      <ul>
        <h2 className="px-6 text-white font-semibold py-4">Cart</h2>
        {cartItems && cartItems.current}
      </ul>
    </div>
  )
}

function Total({ listTotal, cartTotal }) {
  return (
    <div className=" text-white bg-gray-800 p-4 flex items-center justify-between">
      <div>
        <h4 className="text-xl">List Total</h4>
        <h3 className="text-2xl">FCFA {Math.round(Number(listTotal))}</h3>
      </div>
      <div>
        <h4 className="text-xl">Cart Total</h4>
        <h3 className="text-2xl">FCFA {cartTotal}</h3>
      </div>
    </div>
  )
}

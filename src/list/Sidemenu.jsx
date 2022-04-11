import { BsListTask } from 'react-icons/bs'
import { MdOutlinePlaylistAdd } from 'react-icons/md'
import { BiCategory } from 'react-icons/bi'
import { RiListSettingsFill } from 'react-icons/ri'
import { ImOffice } from 'react-icons/im'
import { IoIosFitness } from 'react-icons/io'
import { FaEnvelope, FaBloggerB } from 'react-icons/fa'
import Button from '../components/Button'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'

const sideMenuLinks = [
  {
    name: 'Manage Lists',
    icon: <MdOutlinePlaylistAdd />,
    dest: '/manage/lists',
    tag: 'middle'
  },
  {
    name: 'Manage Categories',
    icon: <BiCategory />,
    dest: '/manage/categories',
    tag: 'middle'
  },
  {
    name: 'Manage Items',
    icon: <RiListSettingsFill />,
    dest: '/manage/items',
    tag: 'middle'
  },
  {
    name: 'Send Feedback',
    icon: <FaEnvelope />,
    dest: '/',
    tag: 'bottom'
  },
  {
    name: 'Blog',
    icon: <FaBloggerB />,
    dest: '/',
    tag: 'bottom'
  }
]

export default function Sidemenu() {
  const [sideLinks, setSideLinks] = useState(sideMenuLinks)
  const { setForm, state } = useStore()

  const topLinks = state?.lists?.map((list) => {
    let iconComp

    switch (list.icon) {
      case 'List':
        iconComp = <BsListTask className="text-4xl" />
        break
      case 'Work':
        iconComp = <ImOffice className="text-4xl" />
        break
      case 'Fitness':
        iconComp = <IoIosFitness className="text-4xl" />
        break
      default:
        iconComp = <BsListTask />
    }
    return (
      <SideListItem
        key={list.id}
        lnk={'lists/' + list.id}
        title={list.name}
        icon={iconComp}
      />
    )
  })
  const middleLinks = sideLinks
    .filter((link) => link.tag === 'middle')
    .map((link) => {
      return (
        <SideListItem
          key={link.name}
          lnk={link.dest}
          title={link.name}
          icon={link.icon}
        />
      )
    })

  const bottomLinks = sideLinks
    .filter((link) => link.tag === 'bottom')
    .map((link) => {
      return (
        <SideListItem
          key={link.name}
          lnk={link.dest}
          title={link.name}
          icon={link.icon}
        />
      )
    })
  return (
    <aside className="h-screen bg-neutral-700 sticky left-0 bottom-0 top-0 w-60 border-r basis-[30%] border-gray-500">
      <div className="border-b border-gray-500 w-full p-4 h-auto pl-0">
        {topLinks}
      </div>
      <div className="border-b border-gray-500 w-full p-4 h-auto pl-0 flex justify-center">
        <Button
          onClick={() => setForm({ type: 'list' })}
          className="bg-blue-500"
          text="CREATE NEW LIST"
        />
      </div>
      <div className="border-b border-gray-500 w-full p-4 h-auto pl-0 flex flex-col items-start">
        {middleLinks}
      </div>
      <div className="border-b border-gray-500 w-full p-4 h-auto pl-0 flex flex-col items-start">
        {bottomLinks}
      </div>
    </aside>
  )
}

function SideListItem({ title, subtitle, icon, lnk }) {
  return (
    <Link to={`${lnk}`} className="w-full">
      <li className="list-none p-5 pr-0  text-white hover:bg-slate-400 flex gap-x-6 items-center">
        <div className="font-bold text-2xl">{icon}</div>
        <div>
          <h4 className=" leading-none">{title}</h4>
          <small>{subtitle}</small>
        </div>
      </li>
    </Link>
  )
}

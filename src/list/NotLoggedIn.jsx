import {FcInfo} from "react-icons/fc"
import Button from "../components/Button"
import { Link } from 'react-router-dom'

export default function NotLoggedIn(){
    return (
        <div className="flex justify-between items-center bg-[rgba(59,130,246,0.1)] p-4 rounded-md">
            <FcInfo className=" cursor-default basis-20 text-xl"/>
            <p className="text-white"> Your changes will not be saved when you leave this website unless you login.</p>
            <Link to="/login">
                <Button className="bg-gray-800" text="LOGIN"/>
            </Link>
        </div>
    )
}
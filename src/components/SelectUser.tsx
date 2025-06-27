import { ChangeEvent, useEffect } from "react"
import { useChatContext } from "../context/ChatContext"
import { User } from "../types";
import { users } from "../utils/constants";

const SelectUser: React.FC=()=>{
    const {dispatch} = useChatContext();

    useEffect(()=>{
        dispatch({type: 'SET_USER', payload: users?.[0]})
    },[dispatch]);

    const handleUserChange = (e:ChangeEvent<HTMLSelectElement>)=>{
        const selectedUser= users.find((user: User)=>user.id===e.target.value)
        if(selectedUser){
            dispatch({type: 'SET_USER', payload: selectedUser})
        }
    }
    
    return(
        <div>
            <h2 className="text-lg font-semibold mb-2">1. Choose your user</h2>
            <select 
            onChange={handleUserChange}
            className="w-full p-2 border rounded cursor-pointer"
            defaultValue={users?.[0].id}
            >
                {users.map((u) => (
                    <option key={u.id} value={u.id} className="hover:bg-blue-500 hover:text-white cursor-pointer">{u.name}</option>
                ))}
            </select>
        </div>
    )
}
export default SelectUser
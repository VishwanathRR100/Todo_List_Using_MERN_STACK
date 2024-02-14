import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import {FaCircle,FaTrash,FaDotCircle,FaMinus} from 'react-icons/fa'

const Home = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/get")
            .then(result => { setTodos(result.data) })
            .catch((err)=>{console.log(err)})
    }, [todos])
    
    const handleEdit = (id) => {
        axios.put('http://localhost:3001/update/'+id)
            .then(result => { console.log(result) })
            .catch(err=>console.log(err))
    }

    const handleDelete = async(id) => {
        try {
            await axios.delete("http://localhost:3001/delete/" + id)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
      <div className='home'>
          <h2>Todo List</h2>
            <Create />
            {
                todos.length === 0
                ?
                <div><h2>The list is empty</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ?
                                <FaDotCircle className="checkbox" />
                        :
                        <FaCircle className="checkbox" />
                        } 
                        {todo.task}
                        </div>&nbsp;
                        <div>
                            <span><FaTrash
                            className="trash"
                                role='button'
                                onClick={()=>handleDelete(todo._id)}
                            /></span>
                        </div>
                    </div>
                ))
            }
      </div>
  )
}

export default Home
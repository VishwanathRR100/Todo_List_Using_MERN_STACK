import React, { useState } from 'react'
import axios from 'axios'

const Create = ({todos,setTodos}) => {
    const [task,setTask] = useState()
    const handleAdd = async () => {
        try {
            await axios.post('http://localhost:3001/add', { task: task })
            setTask("")
        } catch (err) {
            console.log(err)
        }
    }
  return (
      <div className='create_form'>
          <input
              type="text"
              placeholder='Enter Task'
              value={task}
              onChange={(e) => { setTask(e.target.value) }}
              autoFocus
          />
          <button type="button" onClick={handleAdd}>Add</button>
      </div>
  )
}

export default Create
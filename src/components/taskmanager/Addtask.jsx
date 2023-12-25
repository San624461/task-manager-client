import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Providers/Authprovider';

const AddTask = () => {
    const{user}= useContext(AuthContext)
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
         const task = {
            deadline: data.deadline,
            description:data.description,
            priority:data.priority,
            title:data.title,
            status: 'todo',
            email: user.email
         }
         console.log(task);

         fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Task added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                      })
                }
window.location.reload()
                
               
            })
  };

  return (
    <div>
      <form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
        <input className='border-2'
          type="text"
          {...register('title', { required: true })}
          placeholder='Title'
        />

        <input
          type="text" className='border-2'
          {...register('description', { required: true })}
          placeholder='Description'
        />

        <input
          type="text" className='border-2'
          {...register('deadline', { required: true })}
          placeholder='Deadline'
        />

        <select
          {...register('priority', { required: true })}
          placeholder='Priority' className='border-2'
        >
          <option value="Low">Low</option>
          <option value="Moderate">Moderate</option>
          <option value="High">High</option>
        </select>

        <button type="submit" className='btn'>Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;

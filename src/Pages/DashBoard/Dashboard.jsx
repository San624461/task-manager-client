import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';

const Dashboard = () => {


  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);
  console.log(tasks);


  const todo = tasks.filter(task => task.status === 'todo')
  const doing = tasks.filter(task => task.status === 'doing')
  const completed = tasks.filter(task => task.status === 'completed')
  console.log(todo);


  return (
    <>

      <h1 className='text-4xl font-bold w-1/2 mx-auto my-5'>Welcome to the Dashboard</h1>
      <div className='w-full h-[100vh] flex justify-between gap-24'>

        <div className="">

          <Sidebar></Sidebar>
        </div>
        <div className="flex-1 w-full">
          <h1 className='text-xl font-semibold'>Task Status</h1>
          <div className="flex lg:flex-row md:flex-col justify-around gap-24 items-center w-1/2">
            <div className="w-[200px] p-3 h-auto b-4 rounded-lg shadow-lg">
              <h1 className='font-bold'>Todo List</h1>
              {todo.map((task) => (
                <p key={task._id}><span className='font-semibold'>title:</span> {task.title}</p>
              ))}
            </div>
            <div className="w-[200px] h-auto p-3 b-4  rounded-lg shadow-lg">
              <h1 className='font-bold'>Doing List</h1>


              {doing.map((task) => (
                <p key={task._id}><span className='font-semibold'>title:</span> {task.title}</p>
              ))}
            </div>
            <div className="w-[200px] h-auto b-4  p-3 rounded-lg
                
                shadow-lg">


              <h2 className='font-bold'>Completed</h2>
              {completed.map((task) => (
                <p key={task._id}><span className='font-semibold'>title:</span> {task.title}</p>
              ))}
            </div>
          </div>

          <div className="createbutton">
            <Link to='/taskmanager' className='btn my-4 w-1/2 mx-auto'>Create task</Link>
          </div>
        </div>
      </div>

    </>

  );
};

export default Dashboard;
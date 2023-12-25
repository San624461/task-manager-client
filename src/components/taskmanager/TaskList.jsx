import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/Authprovider';
import Swal from 'sweetalert2';

const TaskList = () => {
  const { user } = useContext(AuthContext);
  const userEmail = user?.email
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks/?userEmail=${userEmail}')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      });
  }, [user?.email]);

  const handleDoing = (task) => {
    const updatedTask = { ...task, status: 'doing' };
    fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.modifiedCount>0){
          Swal.fire({
              title: 'Success!',
              text: 'status changed  Successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
      }

        // Updaste the local state with the updated task
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === data._id ? data : t))
        );

        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  const handleCompleted = (task) => {
    const updatedTask = { ...task, status: 'completed' };

    fetch(`http://localhost:5000/tasks/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.modifiedCount>0){
          Swal.fire({
              title: 'Success!',
              text: 'status changed Successfully',
              icon: 'success',
              confirmButtonText: 'Cool'
            })
      }

        // Update the local state with the updated task
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t._id === data._id ? data : t))
        );

        window.location.reload()
      })
      .catch((error) => {
        console.error('Error updating task status:', error);
      });
  };

  const handleDelete = (task) => {
    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/tasks/${task._id}`, {
                    method: 'DELETE'
                })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                           
                        }
                      
                        else {
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete the task",
                                icon: "error"
                            });

                        }
                     window.location.reload() 
                    });
            }

        });
     



}

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task._id}>
              <th>{index + 1}</th>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button
                  disabled={task.status === 'doing'}
                  className="btn"
                  onClick={() => handleDoing(task)}
                >
                  Doing
                </button>
              </td>
              <td>
                <button
                  disabled={task.status === 'completed'}
                  onClick={() => handleCompleted(task)}
                  className="btn"
                >
                  Completed
                </button>
              </td>
              <td>
                <button className="btn" onClick={()=>handleDelete(task)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;

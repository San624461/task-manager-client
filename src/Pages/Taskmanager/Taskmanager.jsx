import React from 'react';
import Addtask from '../../components/taskmanager/Addtask';
import TaskList from '../../components/taskmanager/taskList';
import Sidebar from '../../components/sidebar/Sidebar';
import './taskmanager.css'
const Taskmanager = () => {
    return (
        <div className='w-full flex'>
            <div className='w-[15%]'>
                <Sidebar></Sidebar>
            </div>
            <div className="taskmanager_right">
                <div className='taskmanager_addtask'>
                    <Addtask></Addtask>
                </div>
                <div className='taskmanager_tasklist'>
                    <TaskList></TaskList>
                </div>
            </div>
        </div>
    );
};

export default Taskmanager;
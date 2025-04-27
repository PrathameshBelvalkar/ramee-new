import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ListTask() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/tasks')
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    setTasks(data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    const columns = [
        {
            name: 'Sr. No.',
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: 'Title',
            selector: (row) => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: true,
        },
        {
            name: 'Priority',
            selector: (row) => row.priority,
            sortable: true,
        },
        {
            name: 'Type',
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: 'Due Date',
            selector: (row) => row.due_date,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button onClick={() => handleEdit(row.id)} className="btn btn-sm btn-primary me-2">Edit</button>
                    <button onClick={() => handleDelete(row.id)} className="btn btn-sm btn-danger">Delete</button>
                </div>
            ),
        },
    ];
    const navigate = useNavigate();
    const handleEdit = (id) => {
        console.log('Edit task with id:', id);
        navigate(`/add-task/${id}`);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/api/tasks/delete/${id}`, {
                    method: 'POST',
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status) {
                            Swal.fire(
                                'Deleted!',
                                'The task has been deleted.',
                                'success'
                            );
                            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                        } else {
                            Swal.fire(
                                'Error!',
                                'There was a problem deleting the task.',
                                'error'
                            );
                        }
                    })
                    .catch((error) => {
                        console.error('Error deleting task:', error);
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the task.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className='container mt-3'>
            <div className='d-flex justify-content-between'>
                <h3>Task List</h3>
                <Link to='/add-task'>
                    <button className='btn btn-primary'>Add Task</button>
                </Link>
            </div>
            <DataTable
                columns={columns}
                data={tasks}
                pagination
                highlightOnHover
                responsive
            />
        </div>
    );
}

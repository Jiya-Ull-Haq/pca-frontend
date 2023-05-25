import React, { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
// import { Paginator } from 'primereact/paginator';
import './task-view.component.scss'
import 'primeflex/primeflex.css'; 
import {TaskViewService} from '../services/task-view.service';
import { PrimeContext } from '../../../../../App';

export const TaskViewComponent = () => {
  const { showToast } = useContext(PrimeContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const name = localStorage.getItem('name');
  interface Task {
    task: string;
    assignee_id: number;
    priority: string;
    due_date: string;
    id: number;
    creator_id: number;
    status: string;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await TaskViewService.getTasks();
      response.forEach((task: Task) => {
        task.due_date = task.due_date.split('T')[0];
        const dateParts = task.due_date.split('-');
        task.due_date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      });
      setTasks(response);
      setFilteredTasks(response);
      setTotalRecords(response.length);
    } catch (error: any) {
      if (error.message === 'Request failed with status code 403'){
        localStorage.removeItem('auth');
        window.location.href = '/login';
        showToast('warning', 'Session Expired', 'Please login again');
      }
    }
  };

  const onStatusFilterChange = (e: { value: string }) => {
    setStatusFilter(e.value);
    filterTasks(e.value, priorityFilter);
  };

  const onPrioritySort = (e: { value: string }) => {
    setPriorityFilter(e.value);
    filterTasks(statusFilter, e.value);
  };

  const filterTasks = (status: string, priority: string) => {
    let filteredData = tasks;

    if (status) {
      filteredData = filteredData.filter((task) => task.status === status);
    }

    if (priority) {
      filteredData = filteredData.filter((task) => task.priority === priority);
    }

    setFilteredTasks(filteredData);
    setTotalRecords(filteredData.length);
    setFirst(0);
  };

  const updateTaskStatus = async (taskId: number, newStatus: string) => {
    try {
      await TaskViewService.updateTask(taskId, newStatus);
      fetchData();
    } catch (error) {
      console.log('Error updating task status:', error);
    }
  };

  const renderStatusDropdown = (rowData: { id: any; status: string | number | readonly string[] | undefined; }) => {
    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateTaskStatus(rowData.id, e.target.value);
    };

    return (
      <select value={rowData.status} onChange={handleStatusChange}>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    );
  };

  const onPageChange = (event: { first: React.SetStateAction<number>; rows: React.SetStateAction<number>; }) => {
    setFirst(event.first);
    setRows(event.rows);
  };


  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' , marginTop: '3rem'}} className='card'>
            <h1>Hello {name}!</h1> 
            <DataTable
        value={filteredTasks}
        paginator
        rows={rows}
        first={first}
        totalRecords={totalRecords}
        onPage={onPageChange}
      >
        <Column field="task" header="Task" sortable></Column>
        <Column
        field="priority"
        header="Priority"
        sortable
        sortField="priority"
        ></Column>
        <Column
          field="due_date"
          header="Due Date"
          sortable
          sortField="due_date"
        ></Column>
        <Column
          field="status"
          header="Status"
          body={renderStatusDropdown}
          showFilterMatchModes={false}
          sortable
          showFilterMenuOptions={false}
          showClearButton={false}
          // filter
          // filterElement={
          //   <Dropdown
            
          //     value={statusFilter}
          //     options={[
          //       { label: 'All', value: '' },
          //       { label: 'Pending', value: 'Pending' },
          //       { label: 'Completed', value: 'Completed' },
          //     ]}
          //     onChange={onStatusFilterChange}
          //   />
          // }
        ></Column>
        <Column
          header="Delete"
          body={(rowData) => (
            <button
              className="p-button-danger text-white"
              onClick={() => {
                setFilteredTasks(
                  filteredTasks.filter((task) => task.id !== rowData.id)
                )
                TaskViewService.deleteTask(rowData.id);
              }}
            >
              Delete
            </button>
          )}
        ></Column>
            </DataTable>
    </div>
  );
};

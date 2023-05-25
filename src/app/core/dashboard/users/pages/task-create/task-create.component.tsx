import { useState, useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { TaskCreateService } from '../services/task-create.service';
import './task-create.component.scss';
import { InputText } from 'primereact/inputtext';

export const TaskCreateComponent = () => {
  const [task, setTask] = useState('');
  const [assignee, setAssignee] = useState<any>(null);
  const [priority, setPriority] = useState('');
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [users, setUsers] = useState([]);
  const [invalidDates, setInvalidDates] = useState<Date[]>([]);


  useEffect(() => {
    const today = new Date();
    const invalidDates = [];
    for (let i = 0; i < today.getDate(); i++) {
      const invalidDate = new Date();
      invalidDate.setDate(today.getDate() - i);
      invalidDates.push(invalidDate);
    }
    setInvalidDates(invalidDates);
    
    TaskCreateService.getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log('Error fetching users:', error);
      });
    
  }, []);

  const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAssigneeChange = (e: { value: any }) => {
    setAssignee(e.value);
  };

  const handlePriorityChange = (e: any) => {
    setPriority(e.target.value);
  };

  const handleSubmit = () => {
    const formattedDate = date ? date.toISOString() : '';

    TaskCreateService.createTask(task, assignee, priority, formattedDate)
      .then((data) => {
        console.log('Task created successfully:', data);
        setTask('');
        setAssignee(null);
        setPriority('');
        setDate(undefined);
      })
      .catch((error) => {
        console.log('Error creating task:', error);
      });
  };


  return (
    <div className="card" style={{ maxWidth: '1200px', margin: '0 auto' , marginTop: '3rem'}}>
      <h2>Create Task:</h2>
      <div className='row flex'>
        <div className="p-fluid col-lg-3" style={{flex: 1, marginRight: '3rem'}}> 
          <div className="field">
            <label htmlFor="task">Task</label>
            <InputText id="task" type="text" value={task} onChange={handleTaskChange} />
          </div>

          <div className="field">
            <label htmlFor="assignee">Assignee</label>
            <Dropdown
              id="assignee"
              value={assignee}
              options={
                users.map((user: any) => {
                  return {
                    id: user.id,
                    name: user.username,
                  };
                })
              }
              optionLabel="name"
              optionValue="id"
              onChange={handleAssigneeChange}
              placeholder="Select Assignee"
            />
          </div>

          <div className="field">
            <label htmlFor="priority">Priority</label>
            <Dropdown
              id="priority"
              value={priority}
              options={[
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' }
                
              ]}
              onChange={handlePriorityChange}
              placeholder="Select Priority"
            />
          </div>
        </div>
        <div className='p-fluid col-lg-3' >
        <Calendar
        value={date}
        onChange={(e) => setDate(e.value as Date)}
        inline
        disabledDates={invalidDates}
      />
        </div>
      </div>
      <div className="p-fluid field">
          <Button label="Submit" onClick={handleSubmit} className='mt-5'/>
      </div>
    </div>
    
  );
  
};

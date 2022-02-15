import {Task} from 'src/interfaces/Task';
import { DataGrid } from '@mui/x-data-grid';
import {useRouter} from 'next/router';
import { Button } from '@mui/material';
import TaskList from 'src/components/tasks/TaskList';
import Layout from 'src/components/Layout';

interface Props {
  tasks: Task[]
}

export default function IndexPage({tasks}: Props) {

  const router = useRouter();

  return (
    <Layout>
      {tasks.length === 0 ? (
      <div>
        <h1>No tasks yet</h1>
        <Button onClick={() => router.push('/tasks/new')}>Create one task</Button>
      </div>
      ) : (
        <TaskList tasks={tasks} />
      )}
    </Layout>
  )}

export const getServerSideProps = async() =>{
  const res = await fetch('http://localhost:3000/api/tasks');
  const tasks = await res.json();

  return { 
    props: {
      tasks: tasks
    }
  }
}
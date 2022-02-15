import {Task} from 'src/interfaces/Task';
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
        <h1>No spathios yet</h1>
        <Button onClick={() => router.push('/tasks/new')}>Create one spathio</Button>
      </div>
      ) : (
        <div>
          <h1>Spathios:</h1>
          <TaskList tasks={tasks} />
        </div>
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
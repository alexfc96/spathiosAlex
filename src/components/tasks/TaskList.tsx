import { Task } from "src/interfaces/Task";
import SpathioCard from 'src/components/SpathioCard';
import Grid from '@mui/material/Grid';
interface Props{
    tasks: Task[];
}

function TaskList({ tasks }: Props) {
    return (
        <div>
            <Grid container spacing={5}>
                {tasks.map((task) => (
                    <SpathioCard key={task.id} task={task}></SpathioCard>
                    )
                )}
            </Grid>
        </div>
    )
}

export default TaskList;
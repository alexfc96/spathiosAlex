import { Task } from "src/interfaces/Task";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useRouter } from 'next/router';

interface Props{
    tasks: Task[];
}

function TaskList({ tasks }: Props) {

    const router = useRouter();

  return (
      <div>
        <h1>Tasks list</h1>
            {tasks.map((task) => (
                <Card key={task.id} onClick={() => router.push(`/tasks/edit/${task.id}`)}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {task.title}
                        </Typography>
                        <Typography variant="body2">
                            {task.description}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
      </div>
  )
}

export default TaskList;
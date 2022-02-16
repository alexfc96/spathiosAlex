import { Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Task } from 'src/interfaces/Task';
import { useRouter } from 'next/router';
import Layout from 'src/components/Layout';

export default function NewTaskPage() {

    const router = useRouter();
    const [task, setTask] = useState({
        title: '',
        description: ''
    })
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [name]: value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(typeof router.query.id === 'string') {
                updateTask(router.query.id, task)
            } else {
                createTask(task);
            }
            router.push("/")
        } catch (error) {
           console.log(error) 
        }
    }

    const handleDelete =async (id:string) => {
        try {
            await fetch('http://localhost:3000/api/tasks/' + id, {
                method: 'DELETE',
            })
            router.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    const createTask = async (task: Task) => {
        await fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const updateTask = async (id: string, task: Task) => {
        await fetch('http://localhost:3000/api/tasks/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const loadTask = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/tasks/' + id);
        const task = await res.json();
        setTask({title: task.title, description: task.description});
    }

    useEffect(() =>{
        if(typeof router.query.id === 'string') loadTask(router.query.id)
    }, [router.query])

    return (
        <Layout>
            <Grid container direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <Card>
                        <Typography>
                            Create spathio:
                        </Typography>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <TextField 
                                    id="outlined-basic"    
                                    label="Title" 
                                    variant="outlined" 
                                    placeholder="Write your title"  
                                    name="title" 
                                    onChange={handleChange}
                                    value={task.title}
                                />
                                <TextField 
                                    id="outlined-basic" 
                                    label="Description" 
                                    variant="outlined" 
                                    placeholder="Description" 
                                    name="description" 
                                    onChange={handleChange} 
                                    multiline 
                                    rows={4}
                                    value={task.description}
                                />
                                {router.query.id ? (
                                    <div>
                                        <Button variant="contained" color="success" type="submit">Update</Button>
                                        <Button variant="outlined" onClick={handleClickOpen} color="warning">
                                            Delete
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="draggable-dialog-title"
                                        >
                                            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                                                Delete
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    Are you sure you want to delete this spathio?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button autoFocus onClick={handleClose}>
                                                    Cancel
                                                </Button>
                                                <Button onClick={() => typeof router.query.id === "string" && handleDelete(router.query.id)}>
                                                    Delete
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                    ) : (
                                        <Button variant="contained" color="success" type="submit">Save</Button>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

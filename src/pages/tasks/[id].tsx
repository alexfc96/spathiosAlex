/* eslint-disable @next/next/no-img-element */
import Layout from "src/components/Layout";
import { Typography, Container, Box, Paper, BottomNavigation } from "@mui/material";
import BasicModal from "src/components/Modal";
import { useRouter } from 'next/router';
import { Task } from "src/interfaces/Task";
import { useEffect, useState } from "react";

//tenemos que recibir el id por la url o por prop?
export default function ViewSpathioPage() {
    const router = useRouter();

    const [task, setTask] = useState({
        title: '',
        description: '',
        created_on: ''
    });

    useEffect(() =>{
        if(typeof router.query.id === 'string') loadTask(router.query.id)
    }, [router.query]);

    const loadTask = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/tasks/' + id);
        const task = await res.json();
        setTask({title: task.title, description: task.description, created_on: task.created_on});
    };

    return (
        <Layout>
            <Container sx={{width: 900}}>
                <Box>
                    <Typography variant="h3" component="h1" marginTop={3}>
                        {task.title}
                    </Typography>
                    <img 
                        src="https://s3.eu-west-3.amazonaws.com/spathios.media.files/wp-content/uploads/2022/02/01120625/DSC_0682-scaled.jpg" 
                        alt="Espacio" 
                        width={800}
                        height={325}
                    />
                    <Typography variant="h6" component="h4" marginTop={3}>
                        Description:
                    </Typography>
                    <Typography variant="paragraph" component="p" marginTop={3}>
                        {task.description}
                    </Typography>
                    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation>
                            <BasicModal />
                        </BottomNavigation>
                    </Paper>
                </Box>
            </Container>
        </Layout>
    )
}
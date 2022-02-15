/* eslint-disable @next/next/no-img-element */
import Layout from "src/components/Layout";
import { Typography, Container, Box, Paper, BottomNavigation } from "@mui/material";
import BasicModal from "src/components/Modal";

interface Props{
    task: Task[];
  }

export default function ViewSpathioPage({ task }: Props) {
  return (
    <Layout>
        <Container sx={{width: 900}}>
            <Box>
                <Typography variant="h3" component="h1" marginTop={3}>
                    Espacio 1
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
                    Description large
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
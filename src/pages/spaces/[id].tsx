/* eslint-disable @next/next/no-img-element */
import Layout from "src/components/Layout";
import { Typography, Container, Box, Paper, BottomNavigation } from "@mui/material";
import BasicModal from "src/components/Modal";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

//tenemos que recibir el id por la url o por prop?
export default function ViewSpathioPage() {
    const router = useRouter();

    const [space, setSpace] = useState({
        listingname: '',
        checkin: '',
        checkout: '',
        priceperhour: '',
    });

    useEffect(() =>{
        if(typeof router.query.id === 'string') loadSpace(router.query.id)
    }, [router.query]);

    const loadSpace = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/spaces/' + id);
        const space = await res.json();
        setSpace({listingname: space.listingname, checkin: space.checkin, checkout: space.checkout, priceperhour: space.priceperhour});
    };

    return (
        <Layout>
            <Container sx={{width: 900}}>
                <Box>
                    <Typography variant="h3" component="h1" marginTop={3}>
                        {space.listingname}
                    </Typography>
                    <img 
                        src="https://s3.eu-west-3.amazonaws.com/spathios.media.files/wp-content/uploads/2022/02/01120625/DSC_0682-scaled.jpg" 
                        alt="Espacio" 
                        width={800}
                        height={325}
                    />
                    <Typography variant="h6" component="h4" marginTop={3}>
                        About the space:
                    </Typography>
                    <Typography variant="paragraph" component="p" marginTop={3}>
                        Our creative loft in Poblenou (Barcelona) with lots of light is ideal for sharing moments, experiences and emotions between different cultures and nationalities. They are almost 150 m² in open space with different environments that allow hosting any type of activity. These can be product presentations, pop-ups, team buildings, workshops, show-cooking, photo sessions, shootings, castings and private celebrations (consult). In our creative loft in Poblenou we are characterized by the ease of renting. Our schedule is flexible, and we can offer event management (we offer additional contracting services such as catering, furniture rental, etc.) and personalized treatment. We are in an area easily accessible by public transport.
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
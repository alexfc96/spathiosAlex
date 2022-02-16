/* eslint-disable @next/next/no-img-element */
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AccessTime } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Space } from 'src/interfaces/Space';

interface Props{
  space: Space[];
}

export default function SpathioCard({ space }: Props) {
  const router = useRouter();

  return (
    <Grid item xs={3}>
      <Paper elevation={3} square onClick={() => router.push(`/spaces/${space.listingid}`)}>
        <img 
          src="https://s3.eu-west-3.amazonaws.com/spathios.media.files/wp-content/uploads/2022/02/01120625/DSC_0682-scaled.jpg" 
          alt="Espacio" 
          className="img"
          />
          <Box paddingX={1}>
            <Typography variant="subtitle1" component="h2">
              {space.listingname}
            </Typography>
            <Box
              sx={{ 
                display: "flex",
                alignItems: "center"
              }}
            >
              <AccessTime sx={{ width: 12.5 }} />
              <Typography variant="body2" component="p" marginLeft={0.5}>
                2 hours
              </Typography>
            </Box>
            <Box>
              <Typography variant="h6" component="h3" marginTop={0}>
                  From {space.priceperhour}$
              </Typography>
            </Box>
          </Box>
      </Paper>
    </Grid>
  )
}

// Da problemas la configuracion que tiene next para aceptar imagenes de fuera
{/* <Image 
src='https://s3.eu-west-3.amazonaws.com/spathios.media.files/wp-content/uploads/2022/02/01120625/DSC_0682-scaled.jpg'
alt='Espacio'
className="img"
/> */}
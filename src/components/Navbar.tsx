import Image from 'next/image';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import{useRouter} from 'next/router';

export default function Navbar() {

  const router = useRouter();

  return (
    <div>
        <AppBar position="static">
            <Toolbar>
                <Image 
                src='https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/ex44bgvns9pg4hfgnejk'
                width={110}
                height={75}
                alt='Logo'
                onClick={() => router.push('/')}
                />
                <Button color="inherit" onClick={() => router.push('/tasks/new')}>
                    Create new spathio
                </Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

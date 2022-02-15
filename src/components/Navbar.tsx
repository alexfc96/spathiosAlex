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
                src='https://muimui.es/wp-content/uploads/2021/01/mui-circulo-300x300.png'
                width={30}
                height={30}
                alt='Logo'
                onClick={() => router.push('/')}
                />
                <Button color="inherit" onClick={() => router.push('/tasks/new')}>
                    Create new task
                </Button>
            </Toolbar>
        </AppBar>
    </div>
  )
}

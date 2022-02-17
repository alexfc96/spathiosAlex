import Image from 'next/image';
import { Button, AppBar, Toolbar } from '@mui/material';
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
            </Toolbar>
        </AppBar>
    </div>
  )
}

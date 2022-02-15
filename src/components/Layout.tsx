import { Container } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({ children }: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div>
        <Navbar />
        <main style={{ background: '#212121' }}>
            <Container style={{ paddingTop: '2rem' }}>
                {children}
            </Container>
        </main>
    </div>
  )
}

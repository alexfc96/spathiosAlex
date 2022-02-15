import { Container } from "@mui/material";
import Navbar from "./Navbar";

export default function Layout({ children }: {children: JSX.Element | JSX.Element[]}) {
  return (
    <div>
        <Navbar />
        <main>
            <Container style={{ paddingTop: '2rem' }}>
                {children}
            </Container>
        </main>
    </div>
  )
}

import {useRouter} from 'next/router';
import Layout from 'src/components/Layout';
import { Space } from 'src/interfaces/Space';
import SpacesList from 'src/components/spaces/SpacesList';
interface Props {
  spaces: Space[]
}

export default function IndexPage({spaces}: Props) {
  const router = useRouter();

  return (
    <Layout>
      {spaces.length === 0 ? (
      <div>
        <h1>No spathios yet</h1>
      </div>
      ) : (
        <div>
          <h1>Spathios:</h1>
          <SpacesList spaces={spaces} />
        </div>
      )}
    </Layout>
  )}

export const getServerSideProps = async() =>{
  const res = await fetch('http://localhost:3000/api/spaces');
  const spaces = await res.json();

  return { 
    props: {
      spaces: spaces
    }
  }
}
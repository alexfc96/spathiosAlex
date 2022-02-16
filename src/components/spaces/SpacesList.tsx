import SpathioCard from 'src/components/SpathioCard';
import Grid from '@mui/material/Grid';
import { Space } from 'src/interfaces/Space';
interface Props{
    spaces: Space[];
}

function SpacesList({ spaces }: Props) {
    return (
        <div>
            <Grid container spacing={5}>
                {spaces.map((space) => (
                    <SpathioCard key={space.listingid} space={space}></SpathioCard>
                    )
                )}
            </Grid>
        </div>
    )
}

export default SpacesList;
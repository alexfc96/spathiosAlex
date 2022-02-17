import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { formatISO } from 'date-fns'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BasicDatePicker(props) {
    const router = useRouter();

    const [isAvailable, setIsAvailable] = React.useState<Boolean>(false);
    const [price, setPrice] = React.useState<number>(0);
    const [dayHour, setDayHour] = React.useState<Date | null>(null);
    const [lastHour, setLastHour] = React.useState<Date | null>(null);
    const [space, setSpace] = React.useState({
        listingid: '',
        listingname: '',
        checkin: '',
        checkout: '',
        priceperhour: '',
    });
    const [error, setError] = React.useState(false);

    useEffect(() =>{
        if(typeof router.query.id === 'string') loadSpace(router.query.id)
    }, [router.query]);
    
    useEffect(() =>{
        setLastHour(dayHour)
    }, [dayHour])

    const loadSpace = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/spaces/' + id);
        const space = await res.json();
        setSpace({listingid: space.listingid ,listingname: space.listingname, checkin: space.checkin, checkout: space.checkout, priceperhour: space.priceperhour, listingbusy: space.listingbusy});
    };

    const checkAvailability = () => {
        if(dayHour && lastHour){
            const countHoursOfBooking = lastHour.getHours() - dayHour.getHours();
            if(countHoursOfBooking > 1){
                const initalHourToBook = dayHour.toISOString();
                const lastHourToBook = lastHour.toISOString();
    
                // console.log("intiial hour selected by the user:" , initalHourToBook);
                // console.log("last hour selected by the user:" , lastHourToBook);
                // console.log("Todas las reservas del espacio", space.listingbusy)
    
                space.listingbusy.map((listing) => {
                    if(initalHourToBook <= listing.startDateTime && lastHourToBook >= listing.endDateTime) {
                        console.log("Coincide?:", listing.startDateTime);
                    }
                })
                //if is available:
                setError(false);
                setIsAvailable(true);
                setPrice(countHoursOfBooking * space.priceperhour)
            } else{
                setError(true);
            }
        }
    }

    const makeBooking = async () => {
        const newBooking = {
            "listingBusy":{
                "startDateTime": dayHour.toISOString(),
                "endDateTime": lastHour.toISOString(),
                "status": "blocked"
            },
            "totalPrice": price
        }

        try {
            await fetch('http://localhost:3000/api/spaces/' + space.listingid, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBooking)
            })
            props.onBooking()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box style={{display: 'grid'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Select the day"
                    value={dayHour}
                    disablePast={true}
                    onChange={(newDay) => {
                        setDayHour(newDay);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /><br /><br />
                <TimePicker
                    label="Select the inital hour"
                    value={dayHour}
                    ampm={false}
                    views={["hours"]}
                    onChange={(firstHour) => {
                        setDayHour(firstHour);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /><br />
                <TimePicker
                    label="Select the final hour"
                    value={lastHour}
                    views={["hours"]}
                    disabled={!dayHour}
                    ampm={false}
                    onChange={(lastHour) => {
                        setLastHour(lastHour);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button variant="outlined" onClick={() => checkAvailability()}>
                    Check availability
                </Button>
                {error && 
                    <Typography>
                        Please select correctly the hours
                    </Typography>
                }
                {isAvailable && 
                    <Box style={{display: 'contents'}}>
                        <h2>The total price is: {price} </h2>
                        <Button variant="contained" onClick={() => makeBooking()}>
                            Book spathio
                        </Button>
                    </Box>
                }
            </LocalizationProvider>
        </Box>

    );
}
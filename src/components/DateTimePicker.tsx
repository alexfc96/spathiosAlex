import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function BasicDatePicker(props) {
    const router = useRouter();

    const [isAvailable, setIsAvailable] = React.useState<Boolean>(false);
    const [isNotAvailable, setIsNotAvailable] = React.useState<Boolean>(false);
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

    const removeMinutesFromInitialHour = (date) => {
        date.setMinutes(0);
        date.setSeconds(0);
        setDayHour(date);
    }
    const removeMinutesFromLastHour = (date) => {
        date.setMinutes(0);
        date.setSeconds(0);
        setLastHour(date)
    }

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

                space.listingbusy.map((booking) => {
                    if(initalHourToBook <= booking.startDateTime && initalHourToBook >= booking.endDateTime || lastHourToBook <= booking.startDateTime && lastHourToBook >= booking.endDateTime) {
                        setIsNotAvailable(true);
                    }

                    // if(initalHourToBook <= booking.startDateTime && lastHourToBook >= booking.endDateTime) {
                    //     console.log("coincide")
                    //     setIsNotAvailable(true);
                    // }
                }) 
                if(isNotAvailable == false) {
                    setError(false);
                    setIsNotAvailable(false);
                    setIsAvailable(true);
                    setPrice(countHoursOfBooking * space.priceperhour)
                }
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
                "status": "booked"
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
            props.onSuccessBooking()
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
                        removeMinutesFromInitialHour(firstHour);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                /><br />
                <TimePicker
                    label="Select the final hour"
                    value={lastHour}
                    views={["hours"]}
                    disabled={!dayHour}
                    ampm={false}
                    minTime={dayHour}
                    onChange={(lastHour) => {
                        removeMinutesFromLastHour(lastHour)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <Button variant="outlined" onClick={() => checkAvailability()}>
                    Check availability
                </Button>
                {error && 
                    <Typography>
                        Please select correctly the hours or more than 1 hour
                    </Typography>
                }
                {isNotAvailable && 
                    <Box style={{display: 'contents'}}>
                        <h4>The selected hours are booked right now. </h4>
                    </Box>
                }
                {isAvailable && 
                    <Box style={{display: 'contents'}}>
                        <h2>The total price is: {price}€</h2>
                        <Button variant="contained" onClick={() => makeBooking()}>
                            Book spathio
                        </Button>
                    </Box>
                }
            </LocalizationProvider>
        </Box>

    );
}
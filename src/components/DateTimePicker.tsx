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

export default function BasicDatePicker() {
    const router = useRouter();

    const [dayHour, setDayHour] = React.useState<Date | null>(null);
    const [lastHour, setLastHour] = React.useState<Date | null>(null);
    const [space, setSpace] = React.useState({
        listingname: '',
        checkin: '',
        checkout: '',
        priceperhour: '',
    });

    useEffect(() =>{
        if(typeof router.query.id === 'string') loadSpace(router.query.id)
    }, [router.query]);
    
    useEffect(() =>{
        setLastHour(dayHour)
    }, [dayHour])

    const loadSpace = async (id: string) => {
        const res = await fetch('http://localhost:3000/api/spaces/' + id);
        const space = await res.json();
        setSpace({listingname: space.listingname, checkin: space.checkin, checkout: space.checkout, priceperhour: space.priceperhour, listingbusy: space.listingbusy});
        // console.log("space desde el DateTimePicker", space)
    };

    const checkAvailability = async () => {
        if(dayHour && lastHour){

            const initalHourToBook = dayHour.toISOString();
            const lastHourToBook = lastHour.toISOString();

            console.log("intiial hour selected by the user:" , initalHourToBook);
            console.log("last hour selected by the user:" , lastHourToBook);

            console.log("Todas las reservas del espacio", space.listingbusy)
            space.listingbusy.map((listing) => {
                if(initalHourToBook <= listing.startDateTime && lastHourToBook >= listing.endDateTime) {
                    console.log("Coincide?:", listing.startDateTime);
                }
            })
        }

        // try {
        //     await fetch('http://localhost:3000/api/tasks/' + id, {
        //         method: 'DELETE',
        //     })
        //     router.push("/")
        // } catch (error) {
        //     console.log(error)
        // }
        }

    return (
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
            />
            <TimePicker
                label="Select the final hour"
                value={lastHour}
                views={["hours"]}
                ampm={false}
                onChange={(lastHour) => {
                    setLastHour(lastHour);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            <Button onClick={() => checkAvailability()}>
                Check availability
            </Button>
        </LocalizationProvider>
    );
}
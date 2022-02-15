import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

export default function BasicDatePicker() {
  const [dayHour, setDayHour] = React.useState<Date | null>(null);
  const [lastHour, setLastHour] = React.useState<Date | null>(null);

  useEffect(() =>{
    setLastHour(dayHour)
  }, [dayHour])

  const checkAvailability = async () => {

    

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
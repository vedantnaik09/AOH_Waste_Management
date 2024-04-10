import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import axios from "axios";

const CalendarProgress = () => {
  const [value, onChange] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState('');
  const [correspondingWeight, setCorrespondingWeight] = useState(null);
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get('http://localhost:3000/api/info/getcalenderitems', {
          params: {
            email: email,
          },
        });
        setUser(response.data);

        const latestWeightDate = response.data.weightHistory.reduce((latestDate, entry) => {
          return entry.date > latestDate ? entry.date : latestDate;
        }, '');

        onChange(new Date(latestWeightDate));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleDateChange = (date) => {
    onChange(date);
    const selectedDate = new Date(date); // Convert to local timezone
    const selectedDateString = selectedDate.toLocaleDateString('en-GB'); // Adjust to local date format
    setSelected(true)
  
    if (user && user.weightHistory) {
      const weightEntry = user.weightHistory.find(entry => {
        const entryDate = new Date(entry.date); // Convert to local timezone
        const entryDateString = entryDate.toLocaleDateString('en-GB'); // Adjust to local date format
        return entryDateString === selectedDateString;
      });
  
      if (weightEntry) {
        setCorrespondingWeight(weightEntry.weight);
      } else {
        setCorrespondingWeight(null);
      }
    }
  };
  
  const tileClassName = ({ date }) => {
    const selectedDate = new Date(date); // Convert to local timezone
    const selectedDateString = selectedDate.toLocaleDateString('en-GB'); // Adjust to local date format
  
    if (user && user.weightHistory) {
      return user.weightHistory.some(entry => {
        const entryDate = new Date(entry.date); // Convert to local timezone
        const entryDateString = entryDate.toLocaleDateString('en-GB'); // Adjust to local date format
        return entryDateString === selectedDateString;
      }) ? 'highlighted-date' : '';
    }
    return '';
  };
  
  
  

  return (
    <div className='calendar-container'>
    <Calendar
      onChange={handleDateChange}
      value={value}
      tileClassName={tileClassName} 
      // Set the locale to IST
      locale={'en-IN'}
    />

    {correspondingWeight !== null && (
      <p className='mt-5 bg-[#aee7c8] p-3 rounded-xl font-[system-ui] font-thin'>
        The weight you submitted on {value.toLocaleDateString('en-GB')} is {correspondingWeight} kg
        <br />Keep going!
      </p>
    )}
    {correspondingWeight === null && selected && (
      <p className='mt-5 bg-[#f0fcf9] p-3 rounded-xl font-[system-ui] font-thin'>
        Phew!
        <br />You did not submit any weight on {value.toLocaleDateString('en-GB')}.
      </p>
    )}
  </div>
  );
};

export default CalendarProgress;

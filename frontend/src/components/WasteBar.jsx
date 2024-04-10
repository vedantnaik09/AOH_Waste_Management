import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { waste } from '../constants/wastebar';
import axios from "axios";

Chart.register(...registerables);

const WasteBar = () => {
    const [weightHistory, setWeightHistory] = useState({});
    const [labels, setLabels] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false); // State to determine if the user is admin

    useEffect(() => {
        const fetchWeightHistory = async () => {
            try {
                // Retrieve email from localStorage
                const email = localStorage.getItem('email');
                setIsAdmin(email === 'admin@gmail.com'); // Check if the user is admin

                // If the user is admin, return early without fetching weight history
                if (isAdmin) return;

                // Make API call to fetch weight history
                const response = await axios.get('http://localhost:3000/api/info/getWeightHistory', {
                    params: {
                        email: email,
                    },
                });

                // Extract weights from weightHistory and store in an object
                const weightObj = {};
                const weightLabels = [];

                // Get today's date and last 6 days' dates
                const today = new Date();
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(today.getDate() - i);
                    const formattedDate = date.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
                    weightLabels.push(formattedDate);
                }

                response.data.weightHistory.forEach(entry => {
                    const date = new Date(entry.date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
                    weightObj[date] = entry.weight;
                });

                // Fill in missing dates with weight 0
                weightLabels.forEach(label => {
                    if (!weightObj[label]) {
                        weightObj[label] = 0;
                    }
                });

                // Set weight history state
                setWeightHistory(weightObj);
                setLabels(weightLabels);
            } catch (error) {
                // Handle errors
                console.error('Error fetching weight history:', error);
            }
        };

        // Call the function to fetch weight history on component load
        fetchWeightHistory();
    }, [isAdmin]); // Update useEffect dependencies

    const data = {
        labels: labels, // Use the dynamically generated labels
        datasets: [
            {
                label: 'Waste Amount (in kgs)',
                data: labels.map(label => weightHistory[label]), // Use the weights corresponding to each label
                backgroundColor: '#25B08D', // Optional bar color
                borderColor: 'rgba(255, 99, 132, 1)', // Optional bar border color
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // If the user is admin, don't render the graph
    if (isAdmin) {
        return null;
    }

    return (
        <div className='w-full'>
            <h1 className="text-[1.3rem] my-5">Your progress so far</h1>
            <Bar data={data} options={options} />
        </div>
    );
};

export default WasteBar;

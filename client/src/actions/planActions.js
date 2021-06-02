import axios from 'axios';

export const planTrip = (plan) => {
    axios.post('http://smartrip.cs.colman.ac.il:3001/api/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}

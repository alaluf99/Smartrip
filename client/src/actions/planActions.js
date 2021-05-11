import axios from 'axios';

export const planTrip = (plan) => {
    axios.post('http://localhost:3000/api/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}
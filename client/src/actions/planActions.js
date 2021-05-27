import axios from 'axios';

export const planTrip = (plan) => {
    axios.post('http://localhost:3001/api/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}

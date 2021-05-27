import axios from 'axios';

export const planTrip = (plan) => {
    axios.post('http://smartrip.cs.colman.ac.il/api/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}

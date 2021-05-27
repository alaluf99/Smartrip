import axios from 'axios';

export const planTrip = (plan) => {
    axios.post('http://193.106.55.133:3001/api/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}

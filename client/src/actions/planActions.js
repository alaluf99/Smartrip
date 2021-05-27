import axios from 'axios';

export const planTrip = (plan) => {
    axios.post(config.serverUrl + '/trips/plan', {plan: plan})
        .then((res) => {
            return res.data
        })
}

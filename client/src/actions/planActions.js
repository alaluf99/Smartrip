import axios from 'axios';
import { serverUrls } from '../config/config';

export const planTrip = (plan) => {
    axios.post(serverUrls.plan, {plan: plan})
        .then((res) => {
            return res.data
        })
}

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import FinishPlan from '../plan/plan-finish';

const useStyles = makeStyles((theme) => ({
}));

export default function History() {
    const classes = useStyles();

    return (
        <div>
            <Container>
                <h1>My History</h1>
                <FinishPlan />
            </Container>
        </div>
    );
}
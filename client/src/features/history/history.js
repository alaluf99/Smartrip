import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PlanSummery from '../plan/plan-summery';

const useStyles = makeStyles((theme) => ({
}));

export default function History() {
    const classes = useStyles();

    return (
        <div>
            <Container>
                <h1>My History</h1>
                <PlanSummery />
            </Container>
        </div>
    );
}
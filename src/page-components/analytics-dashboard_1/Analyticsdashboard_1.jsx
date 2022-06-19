import { Grid } from '@mui/material'
import React from 'react'
import Analytic from './analytic-section/Analytic'
import Orders from './orders-section/Orders'
import Sales from './sales-section/Sales'
import Shopping from './shopping-section/Shopping'
import Statics from './statics-section/Statics'

const Analyticsdashboard_1 = () => {
  return (
    <Grid container>

      <Grid item xs={12} md={8}>
        <Grid container>
          <Grid item xs={12}>
            <Statics />
          </Grid>
          <Grid item xs={12}>
            <Sales />
          </Grid>
          <Grid item xs={12}>
            <Orders />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Grid container>
          <Grid item xs={12}>
            <Analytic />
          </Grid>
          <Grid item xs={12}>
            <Shopping />
          </Grid>
        </Grid>
      </Grid>

    </Grid>
  )
}

export default Analyticsdashboard_1
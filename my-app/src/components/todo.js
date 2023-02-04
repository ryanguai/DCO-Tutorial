import React, { Component } from 'react'

import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
    		primary: {
    			light: '#33c9dc',
    			main: '#FF5722',
    			dark: '#d50000',
    			contrastText: '#fff'
    		}
    	}
   });

class todo extends Component {
    render() {
        const { classes } = this.props;
        return (
            <main sx={{flexGrow: 1,
                               padding: theme.spacing(3)}} >
            <div sx={{toolbar: theme.mixins.toolbar}} />
            <Typography paragraph>
                Hello I am todo
            </Typography>
            </main>
        )
    }
}

export default todo;
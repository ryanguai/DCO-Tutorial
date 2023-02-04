// login.js

// Material UI components
import React, { Component } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';

import axios from 'axios';

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


class login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errors: [],
			loading: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.UI.errors) {
			this.setState({
				errors: nextProps.UI.errors
			});
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const userData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post('/login', userData)
			.then((response) => {
				localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
				this.setState({
					loading: false,
				});
				this.props.history.push('/');
			})
			.catch((error) => {
				this.setState({
					errors: error.response.data,
					loading: false
				});
			});
	};

	render() {
		const { classes } = this.props;
		const { errors, loading } = this.state;
		return (
			<Container component="main" maxWidth="xs" sx={{marginTop: theme.spacing(8),
                                                                                		display: 'flex',
                                                                                		flexDirection: 'row',
                                                                                		alignItems: 'center',

                                                                            }}>
				<div>
					<Avatar sx={{marginLeft: theme.spacing(20),
                                 		backgroundColor: theme.palette.secondary.main}}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography sx={{marginLeft: theme.spacing(19), marginTop: theme.spacing(2)}} component="h1" variant="h5">
						Login
					</Typography>
					<form sx={{width: '100%',
                               		marginTop: theme.spacing(1)}} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							helperText={errors.email}
							error={errors.email ? true : false}
							onChange={this.handleChange}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							helperText={errors.password}
							error={errors.password ? true : false}
							onChange={this.handleChange}
						/>
						<Button
							type="submit"
							sx={{margin: theme.spacing(3, 0, 2)}}
							fullWidth
							variant="contained"
							color="primary"
							onClick={this.handleSubmit}
							disabled={loading || !this.state.email || !this.state.password}
						>
							Sign In
							{loading && <CircularProgress size={30} sx={{position: 'absolute'}}  />}
						</Button>
						<Grid container>
							<Grid item>
								<Link href="signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						{errors.general && (
							<Typography variant="body2" sx={{color: 'red',
                                                             		fontSize: '0.8rem',
                                                             		marginTop: 10}} >
								{errors.general}
							</Typography>
						)}
					</form>
				</div>
			</Container>
		);
	}
}

export default login;
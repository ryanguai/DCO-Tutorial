// account.js

import React, { Component } from 'react';

import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@mui/material';
import FormData from 'form-data';

import axios from 'axios';
import { authMiddleWare } from '../util/auth';
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


class account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			username: '',
			country: '',
			profilePicture: '',
			uiLoading: true,
			buttonLoading: false,
			imageError: '',
			image: null
		};
	}

	componentWillMount = () => {
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				console.log(response.data);
				this.setState({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					username: response.data.userCredentials.username,
					uiLoading: false
				});
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleImageChange = (event) => {
		this.setState({
			image: event.target.files[0]
		});
		console.log(this.state.image);
	};

	profilePictureHandler = (event) => {
		event.preventDefault();
		this.setState({
			uiLoading: true
		});
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		let form_data = new FormData();
		form_data.append('image', this.state.image);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.post('/user/image', form_data, {
				headers: {
				    'accept': 'application/json',
                     'Accept-Language': 'en-US,en;q=0.8',
                     'Content-Type': `multipart/form-data; boundary=${form_data._boundary}`,
				}
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					uiLoading: false,
					imageError: 'Error in posting the data'
				});
			});
	};

	updateFormValues = (event) => {
		event.preventDefault();
		this.setState({ buttonLoading: true });
		authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			country: this.state.country
		};
		axios
			.post('/user', formRequest)
			.then(() => {
				this.setState({ buttonLoading: false });
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					buttonLoading: false
				});
			});
	};

	render() {
		const { classes, ...rest } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<main sx={{flexGrow: 1,
                           		padding: theme.spacing(3)}} >
					<div sx={{toolbar: theme.mixins.toolbar}} />
					{this.state.uiLoading && <CircularProgress size={150} sx={{position: 'fixed',
                                                                               		zIndex: '1000',
                                                                               		height: '31px',
                                                                               		width: '31px',
                                                                               		left: '50%',
                                                                               		top: '35%'}} />}
				</main>
			);
		} else {
			return (
				<main sx={{flexGrow: 1,
                                                 		padding: theme.spacing(3)}}>
					<div sx={{toolbar: theme.mixins.toolbar}} />
					<Card {...rest} sx={{marginLeft: '150px', marginTop: '120px'}} >
						<CardContent>
							<div sx={{display: 'flex'}} >
								<div>
									<Typography sx={{paddingLeft: '15px'}} gutterBottom variant="h4">
										{this.state.firstName} {this.state.lastName}
									</Typography>
									<Button
										variant="outlined"
										color="primary"
										type="submit"
										size="small"
										startIcon={<CloudUploadIcon />}
										sx={{marginLeft: '8px',
                                             		margin: theme.spacing(1)}}
										onClick={this.profilePictureHandler}
									>
										Upload Photo
									</Button>
									<input type="file" onChange={this.handleImageChange} />

									{this.state.imageError ? (
										<div sx={{color: 'red',
                                                  		fontSize: '0.8rem',
                                                  		marginTop: 10}} >
											{' '}
											Wrong Image Format || Supported Format are PNG and JPG
										</div>
									) : (
										false
									)}
								</div>
							</div>
							<div sx={{position: 'absolute'}} />
						</CardContent>
						<Divider />
					</Card>

					<br />
					<Card {...rest} sx={{marginLeft: '150px'}} >
						<form autoComplete="off" noValidate>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="First name"
											margin="dense"
											name="firstName"
											variant="outlined"
											value={this.state.firstName}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Last name"
											margin="dense"
											name="lastName"
											variant="outlined"
											value={this.state.lastName}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Email"
											margin="dense"
											name="email"
											variant="outlined"
											disabled={true}
											value={this.state.email}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Phone Number"
											margin="dense"
											name="phone"
											type="number"
											variant="outlined"
											disabled={true}
											value={this.state.phoneNumber}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="User Name"
											margin="dense"
											name="userHandle"
											disabled={true}
											variant="outlined"
											value={this.state.username}
											onChange={this.handleChange}
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
											label="Country"
											margin="dense"
											name="country"
											variant="outlined"
											value={this.state.country}
											onChange={this.handleChange}
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<CardActions />
						</form>
					</Card>
					<Button
						color="primary"
						variant="contained"
						type="submit"
						sx={{marginLeft: '150px'}}
						onClick={this.updateFormValues}
						disabled={
							this.state.buttonLoading ||
							!this.state.firstName ||
							!this.state.lastName ||
							!this.state.country
						}
					>
						Save details
						{this.state.buttonLoading && <CircularProgress size={30} sx={{position: 'absolute'}} />}
					</Button>
				</main>
			);
		}
	}
}

export default account;
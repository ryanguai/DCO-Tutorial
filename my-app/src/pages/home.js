// home.js

import React, { Component } from 'react';
import axios from 'axios';

import Account from '../components/account';
import Todo from '../components/todo';

import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotesIcon from '@mui/icons-material/Notes';
import Avatar from '@mui/material/Avatar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from '@mui/material/styles';

import { authMiddleWare } from '../util/auth'

const drawerWidth = 240;

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

class home extends Component {
	state = {
		render: false
	};

	loadAccountPage = (event) => {
		this.setState({ render: true });
	};

	loadTodoPage = (event) => {
		this.setState({ render: false });
	};

	logoutHandler = (event) => {
		localStorage.removeItem('AuthToken');
		this.props.history.push('/login');
	};

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			profilePicture: '',
			uiLoading: true,
			imageLoading: false
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
					uiLoading: false,
					profilePicture: response.data.userCredentials.imageUrl
				});
			})
			.catch((error) => {
				if(error.response.status === 403) {
					this.props.history.push('/login')
				}
				console.log(error);
				this.setState({ errorMsg: 'Error in retrieving the data' });
			});
	};

	render() {
		const { classes } = this.props;
		if (this.state.uiLoading === true) {
			return (
				<div sx={{display: 'flex'}} >
					{this.state.uiLoading && <CircularProgress size={150} sx={{position: 'fixed',
                                                                               		zIndex: '1000',
                                                                               		height: '31px',
                                                                               		width: '31px',
                                                                               		left: '50%',
                                                                               		top: '35%'}} />}
				</div>
			);
		} else {
			return (
				<div sx={{display: 'flex'}}>
					<CssBaseline />
					<AppBar position="fixed" sx={{zIndex: theme.zIndex.drawer + 1}} >
						<Toolbar>
							<Typography variant="h6" noWrap>
								TodoApp
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						sx={{width: drawerWidth,
                             		flexShrink: 0}}
						variant="permanent"
					>
						<div sx={{toolbar: theme.mixins.toolbar}} />
						<Divider />
						<center>
							<Avatar src={this.state.profilePicture} sx={{height: 110,
                                                                         		width: 100,
                                                                         		flexShrink: 0,
                                                                         		flexGrow: 0,
                                                                         		marginTop: 20}} />
							<p>
								{' '}
								{this.state.firstName} {this.state.lastName}
							</p>
						</center>
						<Divider />
						<List>
							<ListItem button key="Todo" onClick={this.loadTodoPage}>
								<ListItemIcon>
									{' '}
									<NotesIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Todo" />
							</ListItem>

							<ListItem button key="Account" onClick={this.loadAccountPage}>
								<ListItemIcon>
									{' '}
									<AccountBoxIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Account" />
							</ListItem>

							<ListItem button key="Logout" onClick={this.logoutHandler}>
								<ListItemIcon>
									{' '}
									<ExitToAppIcon />{' '}
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>

					<div>{this.state.render ? <Account /> : <Todo />}</div>
				</div>
			);
		}
	}
}

export default home;
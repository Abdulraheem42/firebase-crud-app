import React, {Component} from 'react';
import {Drawer, Divider, List, ListItem, ListItemIcon, ListItemText,
    AppBar, IconButton, Toolbar, Button, Grid, TextField, Container,
    Typography} from '@material-ui/core'
import {withStyles} from "@material-ui/core";
import { Home } from '@material-ui/icons';
import {useStyles} from "../../Material-ui-style";
import TaskForm from './TaskForm';
import TaskView from './TaskView';
import firebase,{firestore} from "../../config/firebaseConfige";
import {NavLink} from "react-router-dom";
import M from "materialize-css";

class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = ({
            task: '',
            data: null,
            user_uid: '',
        })
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    }

    handleSignOut(){
        firebase.auth().signOut();
        console.log('signOut')
        this.setState({
            userId: ''
        })
        this.props.history.push('/signup')
    }


    render() {
        const {classes} = this.props

        return(
            <div className={classes.root}>
                <Container  maxWidth="lg">
                    <Grid container >
                        <Grid item xs={2} md={4}>
                            <nav className='sidenav sidenav-fixed sidenav-close' id='mobile-demo'>
                                <ul>
                                    <li>
                                        <div className="user-view">
                                            <div className="background">
                                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjJVCyisj06rKLXUxiE2rhNRxRVNk4JMvQgEV-rH8vlJexC_T3" />
                                            </div>
                                            <div ><NavLink to='/' className='btn btn-floating light-blue'>AR</NavLink></div>
                                            <a href="#name"><span className="white-text name">UserName</span></a>
                                            <a href="#email"><span className="white-text email">User Email</span></a>
                                        </div>
                                    </li>
                                    <li><NavLink to='/'><i className="large material-icons">home</i>
                                        Home
                                    </NavLink>
                                    </li>
                                    <li><NavLink to='/create'><i className="large material-icons">add</i>
                                        Favorite
                                    </NavLink>
                                    </li>
                                    <li><NavLink to='/notifications'><i className="large material-icons">notifications</i>
                                        Notifications
                                    </NavLink>
                                    </li>
                                    <li><NavLink to=''><i className="large material-icons">settings</i>
                                        Settings
                                    </NavLink>
                                    </li>
                                    <li><NavLink to=''><i className="large material-icons">info</i>
                                        About Us
                                    </NavLink>
                                    </li>
                                    <li><NavLink to = '/' onClick={this.handleSignOut.bind(this)}>
                                        <i className="large material-icons">exit_to_app</i>
                                        Log Out
                                    </NavLink>
                                    </li>
                                </ul>

                            </nav>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {/*<TaskForm />*/}
                            <TaskView />
                        </Grid>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles))(Dashboard);

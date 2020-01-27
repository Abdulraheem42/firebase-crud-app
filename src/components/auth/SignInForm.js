import React, {Component} from 'react';
import {Container, TextField, Typography, Grid, Button} from '@material-ui/core';
import firebase from '../../config/firebaseConfige';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../Material-ui-style'

class SignInForm extends Component{
    constructor(props){
        super(props);
        this.state = ({
            email: '',
            password: '',
            error: null
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {email, password} = this.state;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res)=> {
                console.log('SignIn Successfully')
                this.props.history.push('/dashboard')
            })
            .catch((error) => {
                this.setState({
                    error: error
                });
                console.log('Some thing Wrong!')
            });

        this.setState({
            email: '',
            password: '',
            error: ''
        })
    }

    render(){
        const {classes} = this.props;
        const {email, password, error} = this.state;
        return(
            <div>
                <Container maxWidth='xs'>
                    <Typography className={classes.varient} variant="h3" component="h3">
                        SignIn
                    </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField type="email"
                                           name='email'
                                           id='outlined-email-input'
                                           fullWidth
                                           required
                                           margin="normal"
                                           variant="outlined"
                                           label='Email'
                                           value={email}
                                           onChange={this.handleChange.bind(this)}
                                           placeholder='Email'/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type="password"
                                           name='password'
                                           variant="outlined"
                                           fullWidth
                                           margin="normal"
                                           required
                                           label="Password"
                                           value={password}
                                           onChange={this.handleChange.bind(this)}
                                           placeholder='Password'/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit"
                                        value="SignIn"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        margin="normal"
                                >
                                    Sign in
                                </Button>
                            </Grid>
                            <Grid>
                                <Link to='/signup' style={{color: 'red'}}>Don't have an account?</Link>
                            </Grid>
                            <Grid item xs={12}>
                                {error ? <div style={{color:'red'}}>Some thing Wrong!</div> : null}
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles)(SignInForm));

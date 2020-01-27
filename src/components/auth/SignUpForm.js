import React, {Component} from 'react';
import {Container, Grid, TextField, Button, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import {useStyles} from "../../Material-ui-style";
import firebase,{db} from "../../config/firebaseConfige";


class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state = ({
            fName: '',
            lName: '',
            email: '',
            password: ''
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {email, password, fName, lName} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async (res) => {
                console.log(res, 'res')
                db.collection("users")
                    .doc(res.user.uid)
                    .set({
                        firstName: fName,
                        lastName: lName,
                        email: email,
                        initials: fName[0] + lName[0]
                    });

                this.props.history.push('/dashboard');
            })
            .catch(err => {
                console.log(err, 'err-=-=-=-')
            });

        this.setState({
            fName: '',
            lName: '',
            email: '',
            password: ''
        })
    }
    render() {
        console.log(this.state)
        const {classes} = this.props
        return(
            <div>
                <Container maxWidth="xs">
                    <Typography className={classes.varient} variant="h3" component="h3">
                        SignUp
                    </Typography>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.fName}
                                    type="Text"
                                    required
                                    fullWidth
                                    name='fName'
                                    margin="normal"
                                    variant="outlined"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="outlined-username-input"
                                    label="Last Name"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.lName}
                                    type="Text"
                                    fullWidth
                                    required
                                    name='lName'
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email Address"
                                    onChange={this.handleChange.bind(this)}
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    value={this.state.email}
                                    margin="normal"
                                    fullWidth
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-password-input"
                                    onChange={this.handleChange.bind(this)}
                                    label="Password"
                                    type="password"
                                    value={this.state.password}
                                    fullWidth
                                    required
                                    name="password"
                                    autoComplete="current-password"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                >
                                    Sign Up
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles)(SignUpForm));

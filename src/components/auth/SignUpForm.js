import React, {Component} from 'react';
import {Container, Grid, TextField, Button, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core";
import {useStyles} from "../../Material-ui-style";
import firebase,{firestore} from "../../config/firebaseConfige";


class SignUpForm extends Component{
    constructor(props){
        super(props);
        this.state = ({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            error: '',
            preLoader: false
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value,
            error: null
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {email, password, firstName, lastName} = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async (res) => {
                firestore.collection("users")
                    .doc(res.user.uid)
                    .set({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        initials: firstName[0] + lastName[0]
                    });

                this.props.history.push('/dashboard');
            })
            .catch(err => {
                this.setState({
                    error: err.message,
                    preLoader: false
                });
            });

        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            preLoader: true
        })
    }
    render() {
        console.log(this.state)
        const { error, preLoader } = this.state
        const {classes} = this.props
        return(
            <div>
                <Container maxWidth="md">
                    <form action="" onSubmit={this.handleSubmit.bind(this)}  className='white'>
                        <h2 className="text-grey center">Sign Up</h2>
                        <div className='row'>
                            <div className='col l6 m6 input-field'>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text"
                                       required
                                       value={this.state.firstName}
                                       name='firstName'
                                       id='firstName'
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className='col l6 m6 input-field'>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text"
                                       required
                                       value={this.state.lastName}
                                       name='lastName'
                                       id='lastName'
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className='col l12 m12 s12 input-field'>
                                <label htmlFor="Email">Email</label>
                                <input type="email"
                                       required
                                       value={this.state.email}
                                       name='email'
                                       id='email'
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className='col l12 m12 s12 input-field'>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       required
                                       value={this.state.password}
                                       name='password'
                                       id='password'
                                       onChange={this.handleChange.bind(this)}/>
                            </div>
                            <div className='col l12 m12 s12 center'>
                                <button type='submit' className='btn btn-large blue lighten-1 z-depth-2'>
                                    SignUp
                                </button>
                            </div>

                        </div>
                    </form>
                    <div>
                        {preLoader ?
                            <div className="progress">
                                <div className="indeterminate"></div>
                            </div>
                            : null
                        }
                    </div>
                    <div className='red-text center validation_error' >
                        {error ?
                            <div>
                                <i className="material-icons small" >warning</i>
                                {error}
                            </div>
                            : null
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default (withStyles(useStyles)(SignUpForm));

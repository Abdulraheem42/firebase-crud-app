import React, {Component} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
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
            error: null,
            preLoader: false
        })
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value,
            error: null
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const {email, password} = this.state;
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then((res)=> {
                this.props.history.push('/dashboard')
            })
            .catch((error) => {
                this.setState({
                    error: error.message,
                    preLoader: false
                });
            });

        this.setState({
            email: '',
            password: '',
            preLoader: true
        })
    }

    render(){
        const {email, password, preLoader, error} = this.state;
        return(
            <div>
                <div className='container'>
                    <form className='white' action="" onSubmit={this.handleSubmit.bind(this)}>
                        <h2 className="darken-text-3 center">Sign In</h2>
                        <div className='row'>
                            <div className='col l12 m12 s12 input-field'>
                                <label htmlFor="email">Email</label>
                                <input type="email"
                                       value={email}
                                       id='email'
                                       name='email'
                                       required
                                       onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className='col l12 m12 s12 input-field'>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       value={password}
                                       id='password'
                                       name='password'
                                       required
                                       onChange={this.handleChange.bind(this)} />
                            </div>
                            <div className='col l12 m12 s12 input-field center'>
                                <button type='submit' className='btn blue btn-large lighten-1 z-depth-2'>
                                    SignIn
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
                </div>
            </div>
        )
    }
}

export default (withStyles(useStyles)(SignInForm));

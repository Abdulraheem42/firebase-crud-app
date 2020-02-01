import React, {Component, useContext} from 'react';
import {Container, Grid, TextField} from "@material-ui/core";
import firebase,{firestore} from "../../config/firebaseConfige";
import { Consumer } from '../../context/ContextApi'
import ContextApi from '../../context/ContextApi';

class TaskForm extends Component {
    constructor(props){
        super(props)
        this.state = ({
            task: '',
            user_uid: '',
            // edit_task: ''
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((res) => {
            if(res.uid){
                this.setState({
                    user_uid: res.uid
                })
            }
            else{
                console.log('User has SignOut')
            }
        });
        this.setState({
            task: this.props.edit_task
        })
    }

    // componentWillReceiveProps() {
    //     this.setState({
    //         task: this.props.edit_task
    //     })
    //     console.log(this.props, 'component will props')
    // }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
            event.preventDefault();
            const { user_uid, task } = this.state
            firestore.collection('users')
                .doc(user_uid)
                .collection('tasks')
                .add({
                    task: task,
                    date: new Date()
                }).then((res) => {
                    this.setState({task: ''})
                console.log("Successfully created!")
            })
                .catch((error) => {
                    console.log(error)
                })
        }

render() {
    const { task, edit_task } = this.state;
    console.log(this.props, 'this.props')
    return (
        <div>
            <Container className='task_form' maxWidth='lg'>
                <h1>Today Task</h1>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={this.handleChange.bind(this)}
                                name='task'
                                value={ task }
                                id="standard-textarea"
                                label="My Today Task..."
                                placeholder="Placeholder"
                                fullWidth
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button className="waves-effect waves-light btn" style={{background: '#412079'}} type='submit'>Go to List</button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}
}

export default TaskForm;

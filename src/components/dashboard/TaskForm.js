import React, {Component} from 'react';
import {Button, Container, Grid, TextField} from "@material-ui/core";
import firebase,{firestore} from "../../config/firebaseConfige";

class TaskForm extends Component {
    constructor(props){
        super(props)
        this.state = ({
            task: '',
            user_uid: ''
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
    }

    handleChange(event){
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event){
        const { user_uid, task } = this.state;
        event.preventDefault();
        firestore.collection('users')
            .doc(user_uid)
            .collection('tasks')
            .add({
                task: task,
            })

    }

render() {
    const { task } = this.state
    return (
        <div>
            <Container maxWidth='xs'>
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
                            <Button type="submit"
                                    value="SignIn"
                                    variant="contained"
                                    color="primary"
                                    margin="normal"
                            >
                                Go to List
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </div>
    );
}
}

export default TaskForm;

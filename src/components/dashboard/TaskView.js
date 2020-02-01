import React, {Component, Context} from 'react';
import firebase,{firestore} from "../../config/firebaseConfige";
import {Container} from "@material-ui/core";
import '../../App.css'
import { Provider } from '../../context/ContextApi';
import TaskForm from './TaskForm';

class TaskView extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            edit_task: [],
            data: null,
            user_uid: '',
            doc_id: ''
        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((res) =>{
            if(res.uid) {
                firestore.collection("users")
                    .doc(res.uid)
                    .collection("tasks")
                    .onSnapshot((res) =>{
                        const snapshot = [];
                         res.forEach((res) => {
                            snapshot.push(res)
                        });
                        this.setState({
                            data: snapshot
                        })
                    });
            }
            this.setState({
                user_uid: res.uid
            })
        })
    }

    handleEdit = (task, doc_id) => {
        console.log(doc_id, 'doc_id')
        this.setState({
            edit_task: task,
            doc_id: doc_id
        })
    };

    handleDelete = (doc_id) => {
        const {user_uid} = this.state
        firestore.collection('users')
            .doc(user_uid)
            .collection('tasks')
            .doc(doc_id)
            .delete()
            .then((res) => {
                console.log(res, 'successfully delete')
            })
            .catch( (error) => {
                console.log(error, 'error delete')
            });
    };

    render() {
        const { data, edit_task, doc_id } = this.state;

        return (
            <div>
                <TaskForm edit_task={edit_task} />
                {!data ?
                    <Container maxWidth='lg' style={{height:200,display:"flex", justifyContent: "center", alignItems: "center"}}>
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue-only">
                                <div className="circle-clipper left">
                                    <div className="circle"></div>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"></div>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"></div>
                                </div>
                            </div>
                        </div>
                    </Container>
                    :
                    <Container maxWidth='lg'>
                        {data.map((res, id) =>{
                                return(
                                    <div className='task_list' key={res.id}>
                                        <label>
                                            <input type="checkbox" />
                                            <span style={{width: '85%'}}>{res.data().task}</span>
                                        </label>
                                        <div className='list_action'>
                                            <span className="btn-floating btn-small waves-effect"
                                                  onClick={this.handleEdit.bind(this, res.data().task, res.id)}>
                                                <i className="material-icons">create</i>
                                            </span>
                                            <span className="btn-floating btn-small waves-effect"
                                                  onClick={this.handleDelete.bind(this, res.id)}>
                                                <i className="material-icons">delete</i>
                                            </span>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </Container>
                }
            </div>
        );
    }
}

export default TaskView;

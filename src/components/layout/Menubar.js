import React, {Component} from 'react';
import {AppBar, Toolbar, IconButton, Typography, Button} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import {useStyles} from '../../Material-ui-style'

class Menubar extends Component {
    constructor(props){
        super(props);
        this.state = ({
            userId: ''
        })
    }

    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged((res) => {
    //         console.log(res, 'res')
    //         this.state.userId = res.uid;
    //
    //         this.setState({
    //             userId: true
    //         })
    //     })
    // }

    // handleSignOut(){
    //     firebase.auth().signOut();
    //     console.log('signOut')
    //     this.setState({
    //         userId: ''
    //     })
    //     console.log(this.props, 'this.props')
    //             this.props.history.push('/signup')
    // }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            News
                        </Typography>
                            <Button color="inherit">Login</Button>
                            {/*< Button color = "inherit" onClick={this.handleSignOut.bind(this)}>LogOut</Button>*/}
                        </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default (withStyles(useStyles))(Menubar);

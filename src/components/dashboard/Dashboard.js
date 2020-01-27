import React, {Component} from 'react';
import {Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar, Button} from '@material-ui/core'
import {withStyles} from "@material-ui/core";
// import { InboxIcon, MailIcon} from '@material-ui/icons'
import {useStyles} from "../../Material-ui-style";
import firebase from 'firebase';


class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state = ({

        })
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((res) => {
            console.log(res, 'res')
        })
    }

    handleSignOut(){
        firebase.auth().signOut();
        console.log('signOut')
        this.setState({
            userId: ''
        })
        console.log(this.props, 'this.props')
                this.props.history.push('/signup')
    }

    render() {
        const {classes} = this.props
        return(
            <div>
                <h1>Dashboard</h1>
                < Button color = "inherit" onClick={this.handleSignOut.bind(this)}>LogOut</Button>

                {/*<Drawer*/}
                {/*    className={classes.drawer}*/}
                {/*    variant="permanent"*/}
                {/*    classes={{*/}
                {/*        paper: classes.drawerPaper,*/}
                {/*    }}*/}
                {/*    anchor="left"*/}
                {/*>*/}
                {/*    <div className={classes.toolbar} />*/}
                {/*    <Divider />*/}
                {/*    <List>*/}
                {/*        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
                {/*            <ListItem button key={text}>*/}
                {/*                /!*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*!/*/}
                {/*                <ListItemText primary={text} />*/}
                {/*            </ListItem>*/}
                {/*        ))}*/}
                {/*    </List>*/}
                {/*    <Divider />*/}
                {/*    <List>*/}
                {/*        {['All mail', 'Trash', 'Spam'].map((text, index) => (*/}
                {/*            <ListItem button key={text}>*/}
                {/*                /!*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*!/*/}
                {/*                <ListItemText primary={text} />*/}
                {/*            </ListItem>*/}
                {/*        ))}*/}
                {/*    </List>*/}
                {/*</Drawer>*/}
            </div>
        )
    }
}

export default (withStyles(useStyles))(Dashboard);

import React,{Component} from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MainPage from './mainPage'
import HomeIcon from '@material-ui/icons/Home';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import NetworkViz from './networkViz'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QueueIcon from '@material-ui/icons/Queue';
import EventNoteIcon from '@material-ui/icons/EventNote';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InfoIcon from '@material-ui/icons/Info';
import Poisonexecute from './poisonexecute'
import Infos from './infos'
const drawerWidth = 240;
const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: '#E1E7D2',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },


      appBar: {
        background: '#394585',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,

        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      hide :{
       display: 'none',
      },
      drawer: {

    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
   background: '#8094FF',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
   content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop : 80,
          },
   menuButton:{
    marginRight: theme.spacing(2),


   }
});

class Main extends React.Component {


     constructor(props) {
        super(props)
        this.state={
            open : false,
            panelidx: 3,

        }
          this.handler= this.handler.bind(this);
          this.handlemain= this.handlemain.bind(this);
          this.handleDrawerOpen= this.handleDrawerOpen.bind(this);
          this.handleDrawerClose= this.handleDrawerClose.bind(this);

      };
    handler(i)  {

         this.setState({ panelidx: Number(i) })

       ;}
    handlemain()
    {
    this.handler(3)
    }
    handleDrawerOpen(){
    this.setState({ open: true })
    };

    handleDrawerClose()  {
    this.setState({ open: false })
     };

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                 <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                      [classes.appBarShift]: this.state.open,
                    })}
                  >
                    <Toolbar>


                      <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, this.state.open && classes.hide)}
                      >
                       <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" noWrap style={{flexGrow:1,}} >
                        PFE
                      </Typography>

                       <IconButton
                         aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                            onClick={this.handlemain}
                             color="inherit"

                      >
                        <HomeIcon edge='end'/>
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.state.open}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                  >
                    <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
          <ChevronLeftIcon />
          </IconButton>
              </div>
      <ListItem button className={classes.btn} onClick={()=>{this.handler(0)}} >
                    <ListItemIcon>
                        <QueueIcon
                        style={{ color: 'white' , fontSize: 30 }}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Visualiser le stream" />
                    </ListItem>
                    <ListItem button className={classes.btn} onClick={()=>{this.handler(1)}} >
                    <ListItemIcon>
                        <AutorenewIcon
                       style={{ color: 'white' , fontSize: 30 }}  />
                    </ListItemIcon>
                    <ListItemText primary="Empoisonner & Exécuter" />
                    </ListItem>
                    <ListItem button className={classes.btn} onClick={()=>{this.handler(2)}} >
                    <ListItemIcon>
                        <InfoIcon
                        style={{ color: 'white' , fontSize: 30 }}  />
                    </ListItemIcon>
                    <ListItemText primary="Informations" style={{ color: 'white' , fontSize: 30 }} />
                    </ListItem>

                  </Drawer>
                 <main className={classes.content}>

                    <MainCont panelIndex={this.state.panelidx} ></MainCont>

              </main>
            </Container>
        );
    }
}
    export class MainCont extends React.Component{

    render(){
        const s= this.props.panelIndex
         const panels = [

         <NetworkViz/>,
         <Poisonexecute/>,
         <Infos/>,
         <MainPage/>,

        ];
        const correctPanel = panels[s];

        return (
            <div >
            {correctPanel}
            </div>

        );
    }
    }

export default withStyles(styles)(Main);

import React from 'react'
import FilePicker from './filePicker'
import Radio from '@material-ui/core/Radio';
import Card from '@material-ui/core/Card';
import Popper from '@material-ui/core/Popper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Poisoner from './poison'
import SearchIcon from '@material-ui/icons/Search';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';

const styles = theme => ({
card: {
    top:'20%',
    left: '30%',
    width:800,
    height:'auto',
    minHeight:400,
    position: 'absolute',
    borderRadius: 40,
    borderStyle:'solid' ,
    border: '#9F9EA1',

  },
content:{
left:'20%',
top:'10%',
},
picker:{
    padding:10,
    },
hide :{
       display: 'none',
      },
button: {
    color : 'black',
  },
divTitle: {
color:'#0C180C',
paddingTop : 10,
paddingLeft:0,
fontFamily: 'Arial',
fontSize: 14,
fontWeight: 'bold',

},
divider :{

marging: 20,
width:500,
},
 closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  });
class Poisonexecute extends React.Component{


constructor(props) {
        super(props)
        this.state={
            open : true,
            poison : false,
            fileName: " ",
            openP: false,
            anchorEl : null,
            AUC : 0.0,
            FNR : 0.0,
            time : 0.0,

        }

          this.handlePoisonerOpen= this.handlePoisonerOpen.bind(this);
          this.getPoison= this.getPoison.bind(this);
          this.getFileName = this.getFileName.bind(this);
          this.fadescall = this.Fade_simple_call.bind(this);
          this.fadeacall = this.Fade_Am_call.bind(this);
          this. handleClose = this. handleClose.bind(this);


      };
    handleClose = () => {
        this.setState({ openP: false })

    };
    getPoison = (childData,file) =>{
        console.log("im called")
        this.setState({ poison : childData})
         this.setState({ fileName : file})
    }
    getFileName = (childData) =>{
        this.setState({ fileName : childData})
    }
    handlePoisonerOpen(){
        this.setState({ open: !this.state.open })
        console.log(this.state.open)
    };

   async Fade_simple_call()
    {
    console.log("fade is called!")
    console.log(this.state.fileName);
    const state_JSON = JSON.stringify({'amelioree':0,'file': "./data/"+this.state.fileName});

    const response = await fetch('/resultats',{
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: state_JSON,
      });
    if (response.ok) {
            // if HTTP-status is 200-299
            // get the response body (the method explained below)
           const json = await response.json();
           this.setState({AUC : json['AUC']});
           this.setState({FNR : json['FPR']});
           this.setState({time : json['time']});
           this.setState({ openP: true,});
         }
    else {
           alert("HTTP-Error: " + response.status);
          }

    }
    async Fade_Am_call(event)
    {
    console.log(this.state.fileName);
    const state_JSON = JSON.stringify({'amelioree':1,'file': "./data/"+this.state.fileName});

    const response = await fetch('/resultats',{
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: state_JSON,
      });
    if (response.ok) {
            // if HTTP-status is 200-299
            // get the response body (the method explained below)
           const json = await response.json();
           this.setState({AUC : json['AUC']});
           this.setState({FNR : json['FPR']});
           this.setState({time : json['time']});
           this.setState({openP : true});
         }
    else {
           alert("HTTP-Error: " + response.status);
          }

    }

    render(){
    const {classes} = this.props
    const openi = Boolean(this.state.anchorEl);
    const id = openi ? 'simple-popper' : undefined;
    return(

            <Card className={classes.card}>
                <CardContent className={classes.content} >
                    <Typography className={classes.divTitle}>Importer un dataset</Typography>
                    <div className={classes.picker}>
                    <FilePicker parentCall={this.getFileName}/>

                    </div>
                    <Divider className={classes.divider} />
                    <Toolbar>
                        <IconButton color="inherit" style={{paddingLeft:0}}  aria-label="open drawer" onClick={this.handlePoisonerOpen} edge="start" className={classes.divTitle}>
                            <KeyboardArrowDownIcon style={{paddingRight:10}} />
                           attaque par empoisonnement
                        </IconButton>
                   </Toolbar>
                   <div className={clsx(classes.division, this.state.open && classes.hide)}>
                   <Poisoner file={this.state.fileName} parentCall={this.getPoison} />
                   </div>
                    <Divider className={classes.divider} />
                   <Typography className={classes.divTitle}>Detection d anomalies </Typography>
                    <Grid container spacing={3} style={{ padding:20}} >
                        <Grid item xs={12} sm={6}>
                        <Button variant="raised" component="span" startIcon={<SearchIcon />} onClick={this.fadescall}>
                            FADE
                        </Button>
                        </Grid>
                         <Grid item xs={12} sm={6}>
                          <Button variant="raised" component="span" startIcon={<LocationSearchingIcon />} onClick={this.fadeacall}>
                            FADE++
                        </Button>

                        </Grid>
                         <Popper  open={openi} anchorEl={this.state.anchorEl} id={id} >
                            <div >he content of the Popper.</div>
                        </Popper>
                         <Dialog aria-labelledby="simple-dialog-title" open={this.state.openP}>
                                 <MuiDialogTitle disableTypography >
                                       <Typography variant="h6">Resultats</Typography>
                                             <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                                                    <CloseIcon />
                                             </IconButton>

                                </MuiDialogTitle>
                                <MuiDialogContent dividers>
                                    <p>AUC = {this.state.AUC}</p>
                                    <p>taux des faux negatifs = {this.state.FNR}</p>
                                    <p>temps d execution = {this.state.time} secondes</p>
                                </MuiDialogContent>
                         </Dialog>
                    </Grid>
               </CardContent>
            </Card>



    );
    }



}
export default withStyles(styles)(Poisonexecute);
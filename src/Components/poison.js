import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme =>({
 closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },



});
class Poisoner extends React.Component {

constructor(props) {
     super(props)
     this.state={
         poison : false,
         openP : false,
         file_out : " ",
         size : 0,
         time : 0,
         src : 0,
         dest : 0,

        }
     this.attack = this.attack.bind(this);
     this.handleClose = this.handleClose.bind(this);
     this.handleSave = this.handleSave.bind(this);
     this._handleDestField = this._handleDestField.bind(this);
     this._handleFileField = this._handleFileField.bind(this);
     this._handleSizeField = this._handleSizeField.bind(this);
     this._handleSrcField =  this._handleSrcField.bind(this);
     this._handleTimeField =  this._handleTimeField.bind(this);
      };
handleClose = () => {
     this.setState({ openP: false })

    };
_handleFileField=(e)=>
{this.setState({ file_out: e.target.value });}
_handleSizeField = (e)=>
{ this.setState({  size : e.target.value });}
_handleTimeField= (e)=>{ this.setState({  time : e.target.value });}
_handleDestField= (e)=>
{ this.setState({  dest : e.target.value });}
_handleSrcField=(e)=>
{ this.setState({  src : e.target.value });}
async handleSave()
{
console.log(this.props.file)
     this.props.parentCall(this.state.poison,this.state.file_out);
const state_JSON = JSON.stringify({'poison_size': this.state.size,'file': this.props.file, file_out: this.state.file_out, 't_insert':this.state.time, 'src':this.state.src,'dest':this.state.dest});
console.log(this.state)
 const response = await fetch('/poisoned',{
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
         }
    else {
           alert("HTTP-Error: " + response.status);
          }
             this.setState({ openP: false });
}
async attack()
    {
     this.setState({ poison : true ,openP:true});
    };
render()
{  const {classes} = this.props
   return(
        <div>

         <Grid container spacing={3} style={{ padding:20}}>

             <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="noeud source" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleSrcField} variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="noeud destination" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleDestField} variant="outlined"/>

             </Grid>
               <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="instant d'insertion" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleTimeField} variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="nombre d'aretes à injecter" type="number" InputLabelProps={{shrink: true,}} variant="outlined" onChange={this._handleSizeField}/>


             </Grid>
         </Grid>
         <Button variant='outlined' component="span" onClick={this.attack} style={{left:300,marginBottom:10,background:'#C3C2DA',}}>
                               Empoisonner
         </Button>
          <Dialog aria-labelledby="simple-dialog-title" open={this.state.openP}>
                       <MuiDialogTitle disableTypography >
                               <Typography variant="h6">Sauvegarder</Typography>
                                      <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                                              <CloseIcon />
                                      </IconButton>
                        </MuiDialogTitle>
                         <MuiDialogContent dividers>
                               <TextField required id="outlined-number" label="nouveau fichier "  InputLabelProps={{shrink: true,}} onChange={this._handleFileField} variant="outlined"/>
                         </MuiDialogContent>
                         <MuiDialogActions>
                                <Button autoFocus onClick={this.handleSave} color="primary">
                                    Enregistrer
                                </Button>
                        </MuiDialogActions>
         </Dialog>

        </div>


   );


}

}
export default withStyles(styles)(Poisoner)
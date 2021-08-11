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
class Form extends React.Component {

constructor(props) {
     super(props)
     this.state={
         poison : false,

         fin : 0,
         debut : 0,
         delai : 0,


        }
     this.attack = this.attack.bind(this);

     this._handleDestField = this._handleDestField.bind(this);

     this._handleSrcField =  this._handleSrcField.bind(this);
     this._handleTimeField =  this._handleTimeField.bind(this);
      };

_handleTimeField= (e)=>{ this.setState({  debut : e.target.value });}
_handleDestField= (e)=>
{ this.setState({  fin : e.target.value });}
_handleSrcField=(e)=>
{ this.setState({  delai : e.target.value });}

async attack()
    {
        const state_JSON = JSON.stringify({'file': this.props.file, 'debut': this.state.debut, 'end': this.state.fin,'len': this.state.delai});
        console.log(this.state)
         const response = await fetch('/stream_viz',{
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
                   this.props.parentCall(json['N']);
                   console.log('sent '+ json['N'])
                 }
            else {
                   alert("HTTP-Error: " + response.status);
                  }
    };
render()
{  const {classes} = this.props
   return(
        <div>

         <Grid container spacing={3} style={{ padding:20}}>
             <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="duree de la capture" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleSrcField} variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="Fin" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleDestField} variant="outlined"/>

             </Grid>
               <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="Debut" type="number" InputLabelProps={{shrink: true,}} onChange={this._handleTimeField} variant="outlined"/>

             </Grid>

         </Grid>
         <Button variant='outlined' component="span" onClick={this.attack} style={{left:300,marginBottom:10,background:'#C3C2DA',}}>
                               Visualiser le flux
         </Button>


        </div>


   );


}

}
export default withStyles(styles)(Form)
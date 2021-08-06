import React from 'react'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
class Poisoner extends React.Component {

constructor(props) {
     super(props)
     this.state={
         poison : false,

        }

     this.attack = this.attack.bind(this);

      };
attack()
    {
     console.log("iwas clicked");
     this.setState({ poison : true });
     this.props.parentCall(this.state.poison);
    };
render()
{
   return(
        <div>

         <Grid container spacing={3} style={{ padding:20}}>
             <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="source node" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="destination node" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>

             </Grid>
               <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="timestamp" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={3}>
                <TextField required id="outlined-number" label="poison size" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>


             </Grid>
         </Grid>
         <Button variant='outlined' component="span" onClick={this.attack} style={{left:300,marginBottom:10,background:'#C3C2DA',}}>
                               Empoisonner
         </Button>

        </div>


   );


}

}
export default Poisoner
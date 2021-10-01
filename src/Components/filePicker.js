import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
card: {


    width: 700,

  },
button: {

    color : 'black',

  },

  });
class FilePicker extends React.Component{
    constructor(props) {
     super(props)
     this.state={
         poison : false,
         filename : "a",
         upload : <GetAppIcon/>,
         openP: false,
         Nodes : 0,
         edges : 0,

        };
     this.handleChange = this.handleChange.bind(this);
     this. handleClose = this. handleClose.bind(this);


      };
    handleClose = () => {
        this.setState({ openP: false })

    };
    async handleChange(selectorFiles: FileList)
    {  const name=selectorFiles[0].name
        this.setState({filename : name}, async() => {
           console.log(this.state.filename);
           this.props.parentCall(this.state.filename);
           this.setState({ upload : <CheckCircleSharpIcon style={{ color: '#08ED00' }}/>});
           const state_JSON = JSON.stringify({'file': "./data/" + name});
           const response = await fetch('/data_inf',{
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
                   this.setState({Nodes : json['Nodes']});
                   this.setState({ edges : json['edges']});
                   this.setState({ openP: true,});
                 }
            else {
                   alert("HTTP-Error: " + response.status);
                  }
           this.setState({ openP: true })
         });

    }


render()
{
const { classes } = this.props;
return(

              <div >
                  <input accept="text/*" style={{ display:'none' }}  id="raised-button-file" multiple type="file" onChange={(e) => this.handleChange(e.target.files) } />
                   <label htmlFor="raised-button-file">
                   <Button variant="raised" component="span" startIcon={this.state.upload} className={classes.button}>
                        Importer
                   </Button>
                   </label>
                    <Dialog aria-labelledby="simple-dialog-title" open={this.state.openP} >
                                 <MuiDialogTitle disableTypography  >
                                       <Typography variant="h6" >Dataset</Typography>
                                             <IconButton aria-label="close" className={classes.closeButton} onClick={this.handleClose}>
                                                    <CloseIcon />
                                             </IconButton>

                                </MuiDialogTitle>
                                <MuiDialogContent dividers >
                                    <p> Nombre de noeuds = {this.state.Nodes}</p>
                                    <p> Nombre d aretes = {this.state.edges}</p>

                                </MuiDialogContent>
                    </Dialog>
              </div>



);

}


}
export default withStyles(styles)(FilePicker);
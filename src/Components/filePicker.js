import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import CheckCircleSharpIcon from '@material-ui/icons/CheckCircleSharp';

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

        };
     this.handleChange = this.handleChange.bind(this);

      };
    handleChange(selectorFiles: FileList)
    {  const name=selectorFiles[0].name

        this.setState({filename : name}, () => {
           console.log(this.state.filename);
           this.props.parentCall(this.state.filename);
           this.setState({ upload : <CheckCircleSharpIcon style={{ color: '#08ED00' }}/>})
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
                        Upload
                   </Button>
                   </label>
              </div>



);

}


}
export default withStyles(styles)(FilePicker);
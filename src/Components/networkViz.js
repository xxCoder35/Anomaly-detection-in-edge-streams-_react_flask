import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';
import FilePicker from './filePicker';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Form from './form'
class NetworkViz extends React.Component{
      constructor(props) {
     super(props)
     this.state={
         N : 0,
         file : "",
         isViewerOpen : false,
         currentImage : 0,
         images : [],
         fin : 0,
         debut : 0,
         delai : 0,
         file : "  ",


        };
        this.getFileName = this.getFileName.bind(this)

        this.closeImageViewer = this.closeImageViewer.bind(this)
        this.attack = this.attack.bind(this);

     this._handleDestField = this._handleDestField.bind(this);
     this._handleSrcField =  this._handleSrcField.bind(this);
     this._handleTimeField =  this._handleTimeField.bind(this);
}
   getFileName = (childData)=>
  {
        this.setState({file :"./data/"+childData});
  }




_handleTimeField= (e)=>{ this.setState({  debut : e.target.value });}
_handleDestField= (e)=>
{ this.setState({  fin : e.target.value });}
_handleSrcField=(e)=>
{ this.setState({  delai : e.target.value });}

closeImageViewer = () => {
    this.setState({currentImage :0});
    this.setState({isViewerOpen :false});

  };
  async attack(e)
    {
        e.preventDefault();

        const state_JSON = JSON.stringify({'file': this.state.file, 'debut': this.state.debut, 'end': this.state.fin,'len': this.state.delai});
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
               const json =  await response.json();
               this.setState({N :json['N']});

               let images_i =[];
               for (let i=0;i< 3;i++){
                images_i[i] = require('../graphs/graphe'+i.toString()+'.png').default;
                                                      }

               this.setState({images:images_i} , () => {
               this.setState({isViewerOpen :true});

});
             }
        else {
               alert("HTTP-Error: " + response.status);
              }

    };
render()
{
const { classes } = this.props;

  return (

      <Card >
                <CardContent >
                    <Typography >Importer un dataset</Typography>
                    <div >
                    <FilePicker parentCall={this.getFileName}/>

                    </div>
                    <Divider />


                    <Divider />
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
         <Button variant='outlined' component="span" onClick={this.attack} style={{left:100,marginBottom:10,background:'#C3C2DA',}}>
                         Visualiser le flux
         </Button>

                     {this.state.isViewerOpen && (
                        <ImageViewer
                          src={this.state.images}
                          currentIndex={this.state.currentImage}
                          disableScroll={ false }
                          onClose={ this.closeImageViewer}
                        />
                      )}

           </CardContent>
      </Card>

  );
}}
export default NetworkViz;
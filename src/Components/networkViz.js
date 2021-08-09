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
function NetworkViz() {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    'http://placeimg.com/1200/800/nature',
    'http://placeimg.com/800/1200/nature',
    'http://placeimg.com/1920/1080/nature',
    'http://placeimg.com/1500/500/nature',
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (

      <Card >
                <CardContent  >
                    <Typography >Importer un dataset</Typography>
                    <div >
                    <FilePicker />

                    </div>
                    <Divider />


                    <Divider />
                           <Grid container spacing={3} style={{ padding:20}}>
             <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="debut" type="number" InputLabelProps={{shrink: true,}}  variant="outlined"/>


             </Grid>
              <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="fin" type="number" InputLabelProps={{shrink: true,}}  variant="outlined"/>

             </Grid>
               <Grid item xs={12} sm={4}>
                <TextField required id="outlined-number" label="duree capture" type="number" InputLabelProps={{shrink: true,}} variant="outlined"/>

                </Grid>
         </Grid>
         <Divider/>
              <Button variant="raised" component="span" onClick={openImageViewer}>
                            Visualiser le flux
                    </Button>
                     {isViewerOpen && (
                        <ImageViewer
                          src={ images }
                          currentIndex={ currentImage }
                          disableScroll={ false }
                          onClose={ closeImageViewer }
                        />
                      )}
           </CardContent>
      </Card>

  );
}
export default NetworkViz;
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
function createData(name, M, T_setup, W_upd, m,tth,alpha) {
  return {name, M, T_setup, W_upd, m,tth,alpha};
}
function createData2(name, seuil) {
  return {name, seuil};
}
const rows = [
  createData('Darpa', 100, 8000 , 720 , 200,120,0.999),
  createData('Twitter Security', 500, 7000, 1200, 200,30,0.999),
  createData('ICSX', 10000, 12500, 1200, 100,30,0.999),
  createData('4', 305, 3.7, 67, 4.3,30,0.999),

];
const rows2 = [

  createData2('Twitter Security',1500),
  createData2('ICSX',1000 ),
  createData2('4',1000 ),

];


const styles = theme => ({
             card: {
                    top:'20%',
                    left: '10%',
                    width:1000,
                    height:'auto',
                    minHeight:200,

                    position: 'absolute',
                    borderRadius: 40,
                    borderStyle:'solid' ,
                    border: '#9F9EA1',

  },
                      content:{
                                left:'20%',
                                top:'10%',
                    },
             table: {
                minWidth: 650,
              },

  });
class Info extends React.Component{


render()
{
  const {classes} = this.props
return(

<Card className={classes.card}>
    <CardContent className={classes.content} >
        <Typography><b><u>Description</u></b></Typography>
            <p style={{textAlign:"justify"}}>
            <b>F-FADE</b> est une nouvelle approche pour la détection d&#180;anomalies dans les flux de bord,
            qui utilise une nouvelle technique de factorisation de fréquence pour modéliser efficacement les distributions évolutives dans
            le temps des fréquences des interactions entre les paires de nœuds. Les anomalies sont ensuite déterminées sur la base de la
            vraisemblance de la fréquence observée de chaque interaction entrante. F-FADE est capable de traiter dans un cadre de streaming en
            ligne <b>une grande variété d&#180;anomalies avec des changements temporels et structurels, tout en ne nécessitant qu&#180;une mémoire
            constante</b>. Les expériences sur un réseau synthétique et six réseaux dynamiques du monde réel montrent que F-FADE atteint des
            performances de pointe et <b>peut détecter des anomalies que les méthodes précédentes sont incapables de trouver</b>.
            </p>

             <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Dataset</b></TableCell>
                        <TableCell align="right"><b>M</b></TableCell>
                        <TableCell align="right"><b>T_setup</b></TableCell>
                        <TableCell align="right"><b>W_upd</b></TableCell>
                        <TableCell align="right"><b>m</b></TableCell>
                        <TableCell align="right"><b>T_th</b></TableCell>
                        <TableCell align="right"><b>alpha</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>


                          <TableCell align="right">{row. M}</TableCell>
                          <TableCell align="right">{row.T_setup}</TableCell>
                          <TableCell align="right">{row.W_upd}</TableCell>
                           <TableCell align="right">{row.m}</TableCell>
                          <TableCell align="right">{row.tth}</TableCell>
                           <TableCell align="right">{row.alpha}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <p style={{textAlign:"justify"}}>
            <b>F-FADE+</b> est une version améliorée de F-Fade qui la rend <b>plus robuste</b> en la protégeant de l&#180;impact négatif
            ,des attaques par empoisonnement, sur sa capacité de classer les données correctement.
            </p>
                      <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell><b>Dataset</b></TableCell>
                        <TableCell align="right"><b>seuil filtre</b></TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows2.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>

                          <TableCell align="right">{row. seuil}</TableCell>

                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

 </CardContent>
</Card>

);}

}
export default withStyles(styles)(Info);
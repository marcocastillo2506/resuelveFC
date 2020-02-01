import React from 'react';
import $ from 'jquery';
import './PlayerList.css'

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoaded: false,
    }
    this.getPlayerList = this.getPlayerList.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

  getPlayerList() {
    $.ajax({
      url: '/teamdata',
      method: 'GET',
      success: (results) => {
        this.setState({
          list: results,
          isLoaded: true,
        });
      },
      error: (xhr, err) => {
        console.log('err', err);
      }
    })
  }

  componentDidMount() {
    this.getPlayerList();
    this.renderTableHeader();
  }


  renderTableData() {
    return this.state.list.map((player, index) => {
       const { nombre, nivel, goles, sueldo, bono, sueldo_completo, equipo} = player //destructuring

       var goles_minimos = null
       nivel === 'A'? goles_minimos = 5
       :nivel === 'B'? goles_minimos = 10
       :nivel === 'C'? goles_minimos = 15 : goles_minimos = 20

       if (sueldo_completo === null){
        if(goles_minimos < goles){
            goles_minimos = goles
        }
        var extra = (goles * bono) / goles_minimos
        var total = extra + sueldo
       }
       return (
          <tr key={nombre}>
             <td>{nombre}</td>
             <td>{goles_minimos}</td>
             <td>{goles}</td>
             <td>{sueldo}</td>
             <td>{bono}</td>
             <td>{total.toFixed(0)}</td>
             <td>{equipo}</td>
          </tr>
       )
    })
 }

 renderTableHeader() {
   let headTable = {}
   for(let key in this.state.list[0]){
     headTable[key] = key.toUpperCase();
   }
   return(
      <tr key={"headerTableRow"}>
        <th>{headTable.nombre}</th>
        <th>GOLES_MINIMOS</th>
        <th>{headTable.goles}</th>
        <th>{headTable.sueldo}</th>
        <th>{headTable.bono}</th>
        <th>{headTable.sueldo_completo}</th>
        <th>{headTable.equipo}</th>
      </tr>
   )
  }


  render() {
return (
  <div>
        <h1 id='title'>Resuelve FC Leauge</h1>
        <table id='players'>
           <tbody>
              {this.renderTableHeader()}
              {this.renderTableData()}
           </tbody>
        </table>
     </div>
      )
  }
}

export default PlayerList;

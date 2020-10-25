import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import Layout from '../../components/layout.jsx';
import 'whatwg-fetch';
import utils from '../../../utils/utils.js';
import config from '../../../config.js';

var createReactClass = require('create-react-class');

module.exports = withRouter(createReactClass({
  getRoomList:function(){
    var that = this;
    fetch(config.domain + '/api/v1/rooms.list/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token '+ utils.getCookie('token')
      },
      mode: 'cors'
    }).then(function(res){
      that.setState({
        loading: false
      });
      if(res.status === 200){
        res.json().then(function(res){
          var rooms = [];
          for(var room of res){
            if(!room.individual_access){
              if(localStorage.g3){
                rooms.push(room);
              }
            }else{
              rooms.push(room);
            }
          }
          that.setState({
            rooms: rooms
          });
        });
      } else {
        that.props.router.push({
          pathname: '/login',
          state: {nextPathname: '/rooms'}
        });
      }
    });
  },
  getInitialState: function(){
    return{
      rooms:[],
      loading: true
    };
  },
  componentDidMount: function(){
    this.getRoomList();
  },
  render: function(){
    return ( <Layout title="Rooms">
      <div className="rooms">
        {this.state.loading ? (
          <div className="spinnerContainer">
            <div className="spinner"></div>
          </div>
          ):(<div></div>)}
          <div className="pure-g">
            <div className="pure-u-1">
              <div className="card">
                <img className="pure-img" style={{maxHeight: "600px", margin: "auto"}} src="/img/EngHubLayout.jpg"/>
              </div>
            </div>
            {this.state.rooms.map((room, i) =>{
              return ( 
                <div key={i} className="pure-u-1 pure-u-sm-1-2 pure-u-md-1-3 pure-u-lg-1-4 pure-u-xl-1-5">
                <div className="card">
                  <h2>{room.room_name}</h2>
                  <p>Capacity: {room.capacity}</p>
                  <div className="pure-g" style={{ height: '21px' }}>
                    <div className="pure-u-1-3 centered">{room.coffee ? '☕️' : ''}</div>
                    <div className="pure-u-1-3 centered">{room.water_fountain ? '🚰' : ''}</div>
                    <div className="pure-u-1-3 centered">{room.printers ? '🖨' : ''}</div>
                  </div>
                  <p>
                    <div className="pure-button pure-button-primary"><Link to={'/schedule/'+room.room_id}>View Schedule</Link></div>
                  </p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </Layout>);
  }
}));

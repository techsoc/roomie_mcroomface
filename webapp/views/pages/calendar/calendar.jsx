import React from 'react';
import Layout from '../../components/layout.jsx';
import moment from 'moment';
import utils from '../../../utils/utils.js';
import config from '../../../config.js';

import DayView from './dayView.jsx';

var createReactClass = require('create-react-class');

module.exports = createReactClass({
  getInitialState:function(){
    return {
      date:moment(),
      loading: 0,
      roomName: ''
    }
  },
  updateLoading: function(){
    this.setState({
      loading: this.state.loading + 1
    });
  },
  addDay: function(e){
    e.preventDefault();
    this.setState({
      date:this.state.date.add(1, 'week')
    })
  },
  minusDay: function(e){
    e.preventDefault();
    this.setState({
      date:this.state.date.subtract(1, 'week')
    })
  },
  today: function(e){
    e.preventDefault();
    this.setState({
      date:moment()
    })
  },
  getRoomName: function(){
    var that = this;
    fetch(config.domain + '/api/v1/rooms.list/', {
      method: 'GET',
      headers: {
        'Authorization': 'Token '+ utils.getCookie('token')
      },
      mode: 'cors'
    }).then(function(res){
      that.updateLoading();
      if(res.status === 200){
        res.json().then(function(res){
          for(var room of res){
            if(room.room_id === that.props.params.roomId){
              that.setState({
                roomName: room.room_name
              });
            }
          }
        });
      } else {
        that.props.router.push({
          pathname: '/login',
          state: {nextPathname: '/rooms'}
        });
      }
    });
  },
  componentDidMount: function(){
    this.getRoomName();
  },
  render: function() {
    var days = [];
    for(var i = 0; i < 7; i++){
      var date = this.state.date.clone().add(i, 'day');
      var day = date.format('ddd');
      if(day !== 'Sat' && day !== 'Sun'){
        days.push(
          <div className="pure-u-1-5">
            <DayView date={date} rightBorder={i!==6} roomId={this.props.params.roomId} callback={this.updateLoading}/>
          </div>
        );
      }
    }
    return (
      <Layout title="Calendar">
        {this.state.loading < 6 ? (
          <div className="spinnerContainer">
            <div className="spinner"></div>
          </div>
        ):(<div></div>)}
        <div className="pure-g calendar" hidden={this.state.loading < 6 ? true:false}>
          <div className="pure-u-sm-1-12"></div>
          <div className="pure-u-1 pure-u-sm-20-24 centered">
            <div className="card">
              <h1>{this.state.roomName}</h1>
              <p>Opening times:<br/>
                Mon - Fri: 8:00 - 22:00<br/>
                Sat - Sun: 9:00 - 19:00</p>
              <div className="pure-button" onClick={this.minusDay}>&lt;</div>
              <div className="pure-button" onClick={this.today}>Today</div>
              <div className="pure-button" onClick={this.addDay}>&gt;</div>
              <div className="pure-g">
                {days}
              </div>
            </div>
          </div>
          <div className="pure-u-sm-1-12"></div>
        </div>
      </Layout>
    );
  }
});

import React from 'react'
import moment from 'moment';

import './Timelog.css'
import TimelogItem from './TimelogItem'
import TimelogLabel from './TimelogLabel'
import TimelogSummary from './TimelogSummary'

class Timelog extends React.Component {
  constructor(...args){
    super(...args);
    const localState = this.loadState();
    this.state = localState || this.defaultState;
  }

  defaultState = {
    start: "8:30",
    items: [
      { id: 0, time: "0:30", text: "frokost", billable: false},
      { id: 1, time: "", text: "", billable: true}
    ],
    end: "",
    counter: 2
  }

  updateStart = (time) => {
    this.setState({start: time});
  } 

  deleteItem = (item) => {
    const newItems = this.state.items.filter(x => x !== item);
    this.setState({items: newItems});
  }

  addItem = () => {
    let counter = this.state.counter;
    const item = { id: counter, time: "", text: "", billable: true};
    const newItems = [...this.state.items, item];
    this.setState({items: newItems, counter: counter + 1});
  }

  updateItem = (id, time, text, billable) => {
    const item = {id, time, text, billable};
    const oldItems = this.state.items.filter(x => x.id !== id);
    const newItems = [...oldItems, item];

    this.setState({items: newItems});
  }

  updateEnd = (time) => {
    this.setState({end: time});
  } 

  handleSubmit = (event) => {
    event.preventDefault();
  }

  onSave = () => {
    this.saveState(this.state);
  }

  onLoad = () => {
    const newState = this.loadState();
    this.setState(newState);
  }

  onClear = () => {
    this.setState(this.defaultState);
  }

  startDay = () => {
    const start = this.getStartOfDay();
    const newState = Object.assign({}, this.defaultState, {start});
    this.setState(newState);
    this.saveState(newState);
  }

  getStartOfDay = () => {
    const m = moment();
    const minutes = m.hours() * 60 + m.minutes();
    const rounded = Math.floor(minutes / 15) * 15;
    m.hours(rounded / 60 | 0).minutes(rounded % 60);
    const start = m.format("h:mm");
    return start;
  }

  saveState(state) {
    localStorage.setItem('timelog', JSON.stringify(state));
  }

  loadState() {
    const json = localStorage.getItem('timelog');
    return json && JSON.parse(json);
  }

  render() {
    return (
      <div className="timelog">
        <h1>Timelog</h1>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <TimelogLabel time={this.state.start} text="Start" onChange={this.updateStart} />
              {
                this.state.items.sort((a,b) => a.id - b.id).map(item => {
                  return (<TimelogItem 
                    key={item.id}
                    {...item}
                    onChange={this.updateItem}
                    onDelete={() => this.deleteItem(item)} />);
                })
              }
              <TimelogLabel time={this.state.end} text="Slut" onChange={this.updateEnd} />
              <tr>
                <td></td>
                <td colSpan="3">
                  <input type="submit" onClick={this.addItem} value="tilføj" />
                  <input type="button" value="save" onClick={this.onSave} />
                  <input type="button" value="load" onClick={this.onLoad} />
                  <input type="button" value="clear" onClick={this.onClear} />
                  <input type="button" value="god morgen!" onClick={this.startDay} />                  
                </td>
              </tr>
            </tbody>
          </table>
          <TimelogSummary start={this.state.start} end={this.state.end} items={this.state.items} />
          <p>
            <a href="https://jira.edlund.dk/secure/Dashboard.jspa" target="_blank">Åben Jira</a>            
          </p>
        </form>
          <p>
            <a href="https://app2.timelog.com/edlund/matrix_ugeseddel.asp" target="_blank">Åben timelog</a>            
          </p>
      </div>
    );
  }
}

export default Timelog
import React from 'react'

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

  saveState(state) {
    localStorage.setItem('timelog', JSON.stringify(state));
  }

  loadState() {
    const json = localStorage.getItem('timelog');
    return JSON.parse(json);
  }

  onClear = () => {
    this.setState(this.defaultState);
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
            </tbody>
          </table>
          <input type="submit" onClick={this.addItem} value="tilføj" />
          <input type="button" value="save" onClick={this.onSave} />
          <input type="button" value="load" onClick={this.onLoad} />
          <input type="button" value="clear" onClick={this.onClear} />
          <h2>Arbejde</h2>
          <TimelogSummary start={this.state.start} end={this.state.end} items={this.state.items} />
        </form>
      </div>
    );
  }
}

export default Timelog
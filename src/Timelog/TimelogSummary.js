import React from "react"
import Moment from "moment"
import leftPad from "left-pad"

const regex = /^\D*(\d+)\D*(\d+)?\D*/

class TimelogSummary extends React.Component {
  time2decimal(text) {
    if (regex.test(text)) {
      const match = text.match(regex);
      let value = Number(match[1])
      if (match[2]) {
        value += Number(match[2]) / 60.0;
      }
      return value
    }    
    return 0;
  }

  decimal2time(value) {
    const hours = Math.floor(value);
    const minutes = value * 60 % 60;
    const text = `${hours}:${leftPad(minutes, 2, '0')}`;
    return text;
  }

  getHours = () => {
    const start = this.time2decimal(this.props.start);
    const end = this.getEnd();
    const items = this.props.items.map(x => this.time2decimal(x.time));
    const sum = items.reduce((a,b) => a + b, 0);
    return this.decimal2time(end - start - sum);
  }

  getGoHomeTime = () => {
    const start = this.time2decimal(this.props.start);
    const end = this.getEnd();
    const unbillable = this.props.items
      .filter(x => !x.billable)
      .map(x => this.time2decimal(x.time));
    const sum = unbillable.reduce((a,b) => a + b, 0);
    return this.decimal2time(start + 7 + sum);
  }

  getEnd() {
    const time = this.props.end || `${Moment().hour()}:${Moment().minutes()}`;
    const value = this.time2decimal(time);
    return Math.ceil(value * 4) / 4.0;
  }

  render() {
    return (
      <div>
        <span>{this.getHours()} timer arbejde</span>
        <br />
        <span>{this.getGoHomeTime()} fyraften</span>
      </div>
    );
  }
}

export default TimelogSummary
import React from 'react'

class TimelogLabel extends React.Component {

  onChange = (event) => {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <tr>
        <td></td>
        <td><input type="text" name="time" value={this.props.time} onChange={this.onChange} /></td>
        <td>{this.props.text}</td>
      </tr>
    );
  }
}

export default TimelogLabel
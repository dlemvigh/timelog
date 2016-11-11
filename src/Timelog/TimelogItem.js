import React from 'react'

class TimelogLabel extends React.Component {

  onChangeTime = (event) => {
    this.props.onChange(this.props.id, event.target.value, this.props.text, this.props.billable);
  }

  onChangeText = (event) => {
    this.props.onChange(this.props.id, this.props.time, event.target.value, this.props.billable);
  }

  onChangeBillable = (event) => {
    const billable = event.target.checked;
    this.props.onChange(this.props.id, this.props.time, this.props.text, billable);
  }

  delete = () => {
    this.props.onDelete();
  }

  render() {    
    return (
      <tr>
        <td><input type="checkbox" name="text" checked={this.props.billable} onChange={this.onChangeBillable} /></td>
        <td><input type="text" name="time" value={this.props.time} onChange={this.onChangeTime} /></td>
        <td><input type="text" name="text" value={this.props.text} onChange={this.onChangeText} /></td>
        <td><input type="button" value="slet" onClick={this.delete}/></td>
      </tr>
    );
  }
}

export default TimelogLabel
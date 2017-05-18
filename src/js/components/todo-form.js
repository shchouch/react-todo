import React from 'react';


export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }

  }
  doSubmit (e) {
    e.preventDefault();
    const task = this.state.value.trim();
    if (!task) {
      return;
    }
    this.props.onTaskSubmit(task);
    this.setState({
      value: ''
    });
  };

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
  };

  handleClickTodo(e) {
    this.props.sortTodo();
  };

  handleClickDone(e) {
    this.props.sortDone();
  };

  handleShowkAll(e) {
    this.props.showAll();
  };

  render() {
    return (
      <div className="vert-offset-top-2">
        <hr />
        <div className="clearfix">
          <form className="todo-form form-horizontal" onSubmit={(e) => this.doSubmit(e)}>
            <div className="form-group clearfix">
              <label htmlFor="task" className="col-md-2 control-label">{this.props.strings.label}</label>
              <div className="col-md-10">
                <input type="text" id="task" ref="input" value={this.state.value} onChange={(e) => this.handleChange(e)} className="form-control" placeholder={this.props.strings.placeholder} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right btn-wrapper">
                <input type="submit" value={this.props.strings.submit} className="btn btn-primary pull-right" />
                <button className="btn btn-default" onClick={(e) => this.handleClickTodo(e)}>{this.props.strings.todo}</button>
                <button className="btn btn-default" onClick={(e) => this.handleClickDone(e)}>{this.props.strings.done}</button>
                <button className="btn btn-default" onClick={(e) => this.handleShowkAll(e)}>{this.props.strings.showAll}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }

}
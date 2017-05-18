import React from 'react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInput: false,
      value: this.props.task
    }
  }

  removeNode (e) {
    e.preventDefault();
    this.props.removeNode(this.props.nodeId);
  };

  toggleComplete (e) {
    e.preventDefault();
    this.props.toggleComplete(this.props.nodeId);
  };

  changeHandle(e) {
    this.setState({
      value: e.target.value
    })
  };

  handleDoubleClick(e) {
    if ( !this.state.showInput ) {
      this.setState({
        showInput: true
      })
    }
  };

  doSubmit (e) {
    e.preventDefault();
    var task = this.state.value.trim();
    if (!task) {
      return;
    }
    this.props.edit(task, this.props.nodeId);
    this.setState({
      showInput: false
    });
  };

  render() {
    let classes = 'list-group-item clearfix';
    if (this.props.complete === true) {
      classes = classes + ' list-group-item-done';
    }
    if ( this.props.hide === true ) {
      classes = classes + ' list-group-item-hide';
    }


    return (
      <li className={classes} onDoubleClick={(e) => this.handleDoubleClick(e)}>
        { this.state.showInput ? (
            <form onSubmit={(e) => this.doSubmit(e)}>
              <input type="text" id="edit" ref="input" value={this.state.value} onChange={(e) => this.changeHandle(e)} className="form-control form-edit" placeholder="What do you need to do?" />
              <input type="submit" value="Save Item" className="btn btn-primary pull-right" />
            </form>
          ) : (
          <div>
            <span >{this.props.task}</span>
            <div className="pull-right" role="group">
              <button type="button" className="btn btn-xs btn-success img-circle" onClick={(e) => this.toggleComplete(e)}>&#x2713;</button>
              <button type="button" className="btn btn-xs btn-danger img-circle" onClick={(e) => this.removeNode(e)}>&#x2715;</button>
            </div>
          </div>
          )
        }
      </li>
    )
  }
}
import React from 'react';
import TodoItem from './todo-item';

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var listNodes = this.props.tasks.map(function (listItem) {
      return (
        <TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} hide={listItem.hide} removeNode={this.props.removeNode} toggleComplete={this.props.toggleComplete} edit={this.props.edit} />
      );
    },this);

    return (
      <ul className="list-group">
        {listNodes}
      </ul>
    )
  }
}
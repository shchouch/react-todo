import React from 'react';
import { connect } from 'react-redux';
import TodoList from './todo-list';
import TodoForm from './todo-form';
import LangBtn from './langBtn';
import LocalizedStrings from 'react-localization';

import {submit, remove, edit, sortTodo, sortDone, showAll, toggleComplete} from '../actions/todo';

const strings = new LocalizedStrings({
  en:{
    title: 'Lang',
    header: 'Todo:',
    todo:"What to do?",
    done:"What is done?",
    showAll:"Show all",
    placeholder:"What do you need to do?",
    label: 'Task',
    submit: 'Save Item'
  },
  jp: {
    title: 'ラング',
    header: '目的：',
    todo:"何をすべきか？",
    done:"何が行われますか？?",
    showAll:"すべて表示する",
    placeholder:"あなたは何をする必要がありますか？",
    label: '仕事',
    submit: 'アイテムを保存'
  }
});

class Todo extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLangChange(lang) {
    strings.setLanguage(lang);
    this.setState({});
  }

  render() {
    return (
      <div className="todo">
        <h1>{strings.header}</h1>
        <LangBtn handleLangChange={this.handleLangChange.bind(this)} title={strings.title} />
        <TodoList tasks={this.props.tasks} removeNode={this.props.remove} toggleComplete={this.props.toggleComplete} edit={this.props.edit} />
        <TodoForm strings={strings} onTaskSubmit={this.props.submit} sortTodo={this.props.sortTodo} sortDone={this.props.sortDone} showAll={this.props.showAll} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.todo.data
  }
};

export default connect(mapStateToProps, {submit, remove, edit, sortTodo, sortDone, showAll, toggleComplete})(Todo);
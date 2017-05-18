const initialState = {
  data: [
    {
      "id":"00001",
      "task":"Task 1",
      "complete":false,
      "hide": false
    },
    {
      "id":"00002",
      "task":"Task 2",
      "complete":false,
      "hide": false
    },
    {
      "id":"00003",
      "task":"Task 3",
      "complete":false,
      "hide": false
    },
    {
      "id":"00004",
      "task":"Task 4",
      "complete":true,
      "hide": false
    }
  ],

};

const todo = (state = initialState, action) => {
  switch(action.type) {
    case 'SUBMIT':
      let task = action.task;
      let id = generateId().toString();
      let complete = false;
      let hide = false;
      const dataAdd = state.data.concat([{id, task, complete, hide}]);
      return Object.assign({}, state, {
          data: dataAdd
      });
    case 'REMOVE' :
      //var data = this.state.data;
      const dataRemove = state.data.filter( el => {
        return el.id !== action.nodeId;
      });
      return Object.assign({}, state, {
        data: dataRemove
      });
    case 'EDIT':
      const dataEdit = state.data.map( el => {
        if ( el.id === action.editData.nodeId ) {
          el.task = action.editData.task;
        }
        return el;
      });
      return Object.assign({}, state, {
        data: dataEdit
      });
    case 'SORT_TODO':
      const dataSortTodo = state.data.map( el => {
        if ( el.complete === false ) {
          el.hide = false;
        }
        if ( el.complete === true ) {
          el.hide = true;
        }
        return el;
      });
      return Object.assign({}, state, {
        data: dataSortTodo
      });
    case 'SORT_DONE':
      const dataSortDone = state.data.map( el => {
        if ( el.complete === false ) {
          el.hide = true;
        }
        if ( el.complete === true ) {
          el.hide = false;
        }
        return el;
      });
      return Object.assign({}, state, {
        data: dataSortDone
      });
    case 'SHOW_ALL':
      const dataShowAll = state.data.map( el => {
        if ( el.hide === true ) {
          el.hide = false;
        }
        return el;
      });
      return Object.assign({}, state, {
        data: dataShowAll
      });
    case 'TOGGLE_COMPLETE':
      const dataToggleComplete = state.data.map( el => {
        if (el.id === action.nodeIdComplete) {
          el.complete = el.complete === true ? false : true;
        }
        return el;
      });
      return Object.assign({}, state, {
        data: dataToggleComplete
      });
    }
    return state;
};

function generateId () {
  return Math.floor(Math.random()*90000) + 10000;
}

export default todo;
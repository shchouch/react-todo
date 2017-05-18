export function submit(task) {
  return {
    type: 'SUBMIT',
    task: task
  }
}

export function remove(nodeId) {
  return {
    type: 'REMOVE',
    nodeId: nodeId
  }
}

export function edit(task, nodeId) {
  console.log(task);
 return {
   type: 'EDIT',
   editData: {
     task: task,
     nodeId: nodeId
   }
 }
}

export function sortTodo() {
  return {
    type: 'SORT_TODO'
  }
}

export function sortDone() {
  return {
    type: 'SORT_DONE'
  }
}

export function showAll() {
  return {
    type: 'SHOW_ALL'
  }
}

export function toggleComplete(nodeId) {
  return {
    type: 'TOGGLE_COMPLETE',
    nodeIdComplete: nodeId
  }
}


console.log('js');

$(document).ready(readyNow);

function readyNow() {
    console.log('jQuery');
    $('#submit-button').on('click', saveTodo);
    $('#todo-list').on('click', '.remove-button', deleteTodo)
    $('#todo-list').on('click', '.toggle', markCompleted)
    getTodo();
}

function getTodo(){
    console.log( 'in getTodo' );
    $.ajax({
        method: 'GET',
        url: '/todo',
    }).then( function (response) {
        let todo = response;
        console.log('Getting todo list: ', todo);
        renderTodoList(todo);
    }).catch( function (error) {
        console.log('Something went wrong getting todo list: ', error);
        alert('Something went wrong getting todo list');
    })
}

function renderTodoList(todoInfo) {
console.log(todoInfo);
$('#todo-list').empty();
            
let $tdToggle = '';


    for (let todo of todoInfo) {
        let date = new Date(todo.due);

        if (todo.status === true) {
            $tdToggle = 'green';
        } else {
            $tdToggle = ``;
        }

        let $tr = $(`<tr class="${$tdToggle}">
            <td>
                <button class="toggle btn btn-primary">${todo.status}</button>
            </td>
            <td>${todo.todo}</td>
            <td>${date.toLocaleDateString()}</td>
            <td>
                <button class="remove-button btn btn-primary">Remove</button>
            </td>
        </tr>`)
        
        $('#todo-list').append($tr);
        $tr.data(todo);
    }
}
  
function saveTodo(event) {
    event.preventDefault();
    console.log('In save todo');
    let todoToSend = {
        todo: $('#todo-in').val(),
        due: $('#date-in').val(),
        status: false,
    }
    console.log(todoToSend);
    
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: todoToSend,
    }).then( function(response) {
        getTodo();
        clearInputFields();
    }).catch( function(error) {
        console.log('Something went wrong adding todo', error);
        alert('Something went wrong adding todo')
    })
}

function deleteTodo() {
    let $deleteButton = $(this);
    let $tr = $deleteButton.closest('tr');
    console.log($tr);
    let todoId = $tr.data('id');
    console.log('Song id is: ', todoId);
    
    $.ajax({
        method: 'DELETE',
        url: `/todo/${todoId}`
    }).then(function(response) {
        getTodo();
    }).catch(function(error) {
        console.log('Something went wrong. Loser.', error);
        alert('Couldn\'t delete song');
    })
    
}

function markCompleted() {
    let $markCompleted = $(this);
    let $tr = $markCompleted.closest('tr');
    console.log('tr', $tr);
    
    let todoInfo = $tr.data();
    console.log('todo ID: ', todoInfo);
    
 
    if (todoInfo.status === false) {
        todoInfo.status = true;
    } else {
        todoInfo.status = false;
    }

    $.ajax({
      method: 'PUT',
      url: `/todo/${todoInfo.id}`,
      data: todoInfo,
    }).then( function(response) {
      getTodo();
    }).catch( function(error) {
      console.log('Something went wrong updating todo list', error);
      alert('Something went wrong updating todo list');
    })
  }

function clearInputFields() {
    $('#todo-in').val('');
    $('#date-in').val('');
}
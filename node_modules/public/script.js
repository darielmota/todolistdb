
// hola mundo
document.addEventListener('DOMContentLoaded' ,() => {
    fetchTasks();
});

function fetchTasks() {
    fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.description;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Eliminar'
            removeButton.onclick = () => removeTask(task.id);
            li.appendChild(removeButton);
            taskList.appendChild(li);
        });
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDescripition = taskInput.value;
    if (taskDescripition) {
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({description: taskDescripition})
        })
        .then(response => response.text())
        .then(() => {
            taskInput.value = '';
            fetchTasks();
        });
    }
}

function removeTask(taskId) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => response.text())
        .then(() => {
            fetchTasks();
        });
}
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');  // Button to add tasks
    const taskInput = document.getElementById('task-input');  // Input field to enter tasks
    const taskList = document.getElementById('task-list');  // List to display tasks

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false means don't save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;  // Set the text of the task

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';  // Set button text
        removeButton.classList.add('remove-btn');  // Add class for styling

        // Event listener to remove the task when clicked
        removeButton.addEventListener('click', function() {
            taskItem.remove();  // Remove the <li> element from the list
            removeTaskFromStorage(taskText);  // Remove the task from Local Storage
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the new task item to the task list
        taskList.appendChild(taskItem);

        // After appending, save to Local Storage if required
        if (save) {
            saveTaskToStorage(taskText);
        }

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);  // Add the new task to the array
        localStorage.setItem('tasks', JSON.stringify(storedTasks));  // Save the updated array
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);  // Remove the task
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Save the updated array
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();  // Get the task input and trim extra spaces

        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        addTask(taskText);  // Add the new task
    });

    // Allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();  // Get the task input and trim extra spaces

            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }

            addTask(taskText);  // Add the new task
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});

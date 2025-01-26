// Wait for the DOM to fully load before executing the code
document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-task-btn');  // Button to add tasks
    const taskInput = document.getElementById('task-input');  // Input field to enter tasks
    const taskList = document.getElementById('task-list');  // List to display tasks

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();  // Get the task input and trim extra spaces

        // If the input is empty, alert the user and stop the function
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;  // Set the text of the task

        // Create a remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';  // Set button text
        removeButton.classList.add('remove-btn');  // Add class for styling

        // Event listener to remove the task when clicked
        removeButton.addEventListener('click', function() {
            taskItem.remove();  // Remove the <li> element from the list
        });

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the new task item to the task list
        taskList.appendChild(taskItem);

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Event listener for the Add Task button
    addButton.addEventListener('click', addTask);

    // Allow pressing "Enter" to add a task
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();  // Call addTask if Enter is pressed
        }
    });
});

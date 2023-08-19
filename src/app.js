const taskInput = document.querySelector('#task')
const timeInput = document.querySelector('#time')
const addTaskBtn = document.querySelector('#addTask')
const clearAllBtn = document.querySelector('#clearAll')
const taskLi = document.querySelector('#taskList')
const listSection = document.querySelector('#listSection')
const form = document.querySelector('form')
const todoList = document.querySelector('#todoList')
const contactPage = document.querySelector('.contactMe')
const addTodo = document.querySelector('#addTodo')
const contact = document.querySelector('#contact')
const taskCount = document.querySelector('.count')


const tasks = JSON.parse(localStorage.getItem('key')) || [];
taskCount.innerHTML=tasks.length


function renderTasks() {
    taskLi.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
        <span class="task-desc">${task.desc} - ${task.time}</span>
        <button class="del" data-index="${index}">Delete</button>
      `;

        taskLi.appendChild(li);
    });
};



function saveTasks() {
    localStorage.setItem('key', JSON.stringify(tasks));
    renderTasks();
};

function addTask() {
    const task = {
        desc: taskInput.value,
        time: `${timeInput.value}:00`,
        completed: false
    };
    if (taskInput.value && timeInput.value) {
        tasks.push(task);
        saveTasks();
        taskInput.value = '';
        timeInput.value = '';
    } else {
        alert('Enter task and time!');
    }
}

addTaskBtn.addEventListener('click', addTask)

taskLi.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const index = event.target.getAttribute('data-index');
        tasks.splice(index, 1);
        taskCount.innerHTML=tasks.length
        saveTasks()
    }
})

taskLi.addEventListener('click', (event) => {
    if (event.target.tagName === 'INPUT') {
        const index = event.target.parentElement.querySelector('button').getAttribute('data-index');
        tasks[index].completed = event.target.checked;
        saveTasks();
    }
})

clearAllBtn.addEventListener('click', () => {
    const undoneTask = tasks.filter(task => !task.completed);
    tasks.length = 0;
    tasks.push(...undoneTask);
    saveTasks();
})

function showSection(sectionId) {
    const sections = ['addSection', 'listSection', 'contactSection'];
    sections.forEach(section => {
        const currentSection = document.getElementById(section);
        if (section === sectionId) {
            currentSection.style.display = 'block';
        } else {
            currentSection.style.display = 'none';
        }
    });
}

const navLinks = document.querySelectorAll('nav p');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        if (e.target.className === 'add') {
            showSection('addSection');
        } else if (e.target.className === 'list') {
            renderTasks();
            showSection('listSection');
        } else if (e.target.className === 'contact') {
            showSection('contactSection');
        }
    });
});


function checkAndDisplayTaskNotification() {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

    tasks.forEach(task => {
        const currentDate = new Date();
        const inputTimeParts = task.time.split(':');
        currentDate.setHours(parseInt(inputTimeParts[0], 10));
        currentDate.setMinutes(parseInt(inputTimeParts[1], 10));
        const userTime = currentDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

        if (userTime === currentTime) {
            showTaskNotification(userTime);
        }
    });
}


setInterval(checkAndDisplayTaskNotification, 60000);

window.addEventListener('load', () => {
    showSection('addSection');
    checkAndDisplayTaskNotification();
});

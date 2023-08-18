const taskInput = document.querySelector('#task')
const timeInput = document.querySelector('#time')
const addTaskBtn = document.querySelector('#addTask')
const clearAllBtn = document.querySelector('#clearAll')
const taskLi = document.querySelector('#taskList')

const tasks = JSON.parse(localStorage.getItem('key')) || [];
console.log(tasks);


function renderTasks(){
    taskLi.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''} />
        <span>${task.desc} - ${task.time}</span>
        <button data-index="${index}">Delete</button>
      `;
       taskLi.appendChild(li);
    });
};

function saveTasks(){
    localStorage.setItem('key',JSON.stringify(tasks));
    renderTasks();
};

function addTask(){
    const task ={
        desc: taskInput.value,
        time: timeInput.value,
        completed: false
    };
    tasks.push(task);
    saveTasks();
    taskInput.value = ''
    timeInput.value = ''
}
addTaskBtn.addEventListener('click', addTask)

taskLi.addEventListener('click', (event) => {
    if(event.target.tagName === 'BUTTON'){
        const index = event.target.getAttribute('data-index');
        tasks.splice(index,1);
        saveTasks()
    }
})

taskLi.addEventListener('click', (event) =>{
    if(event.target.tagName === 'INPUT'){
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

 






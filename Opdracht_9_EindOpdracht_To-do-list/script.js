// =====variables======
const taskUl = document.getElementById("task-list")
const removeAllBtn = document.getElementById("remove-all-btn")
const addBtn = document.getElementById("add-task-btn")
const taskInput = document.getElementById("input-field")

// =====load spinner====== 
/* simpele spinner, copy/pasted en aangepast 
van de filmzoeker opdracht */


let showSpinner = () => {
    const spinner = document.querySelector("#spinner");
    spinner.style.opacity = "0.9";
    spinner.style.color = "grey";

};

let hideSpinner = () => {
    const spinner = document.querySelector("#spinner");
    spinner.style.opacity = "0";
    spinner.style.color = "grey";

};
// =====load spinner======



// =====setting data to DOM======


const setData = async () => {
    const taskData = await getData();
    taskUl.querySelectorAll("*").forEach((task) => task.remove());

    taskData.forEach(task => {

        let newDiv = document.createElement("div")
        let newLi = document.createElement("li");
        newLi.setAttribute("contenteditable", "true")
        let deleteLi = document.createElement("img")
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        deleteLi.setAttribute("src", "noun_Trash_3595480.png")
        deleteLi.setAttribute("class", "trash-icon")
        deleteLi.setAttribute("id", task._id)
        taskUl.append(newDiv)
        newDiv.append(checkbox, newLi, deleteLi)
        newLi.innerHTML = task.description;

        // ==========checks checkbox================
        checkbox.addEventListener("click", async () => {
            if (task.done == true) {
                await updateData(task._id, task.description, false)
                await setData()
            } if (task.done == false) {
                await updateData(task._id, task.description, true)
                await setData()
            }
        })
        if (task.done == true) {
            newLi.setAttribute("class", "task-done")
            checkbox.checked = true
        }
        // ==========checks checkbox================

    }
    )
}

window.onload = setData()
// =====setting data to DOM======


// =====adds task on btn click======
addBtn.addEventListener("click", async () => {
    let inputValue = taskInput.value
    await postData(inputValue)
    await setData()
})


// =====adds task on enter click======
taskInput.addEventListener("keydown", async event => {
    if (event.code === "Enter") {
        let inputValue = taskInput.value
        await postData(inputValue)
        await setData()
    }
})


// =====removes task from list on click======

taskUl.addEventListener("click", async (e) => {
    if (e.target.className === "trash-icon") {
        let postID = e.target.id
        await removeData(postID)
        await setData()
    }
})

// =====edits task on click======
/* zal vast wel korter kunnen, maar dit was het beste wat ik kon verzinnen 
met werken met "contenteditable" class */

taskUl.addEventListener("click", async (e) => {

    let postID = e.target.parentNode.children[2].id
    let taskDone = e.target.parentNode.children[1].className
    if (e.target.tagName === "LI") {
        e.target.addEventListener("keydown", async (event) => {

            if (event.code === "Enter" && taskDone === "task-done") {
                let task = event.path[0].innerHTML;
                await updateData(postID, task, true)
                await setData()
            }

            else if(event.code === "Enter" && taskDone === "") {
                let task = event.path[0].innerHTML;
                await updateData(postID, task, false)
                await setData()
            }
        })

    }
})

// =====edits task on click======




// =====removes ALL task from list on click====== werkt niet optimaal, 
// voert setData() uit bij elke taak die die verwijdert. Kreeg het niet opgelost, maar het werkt wel.

removeAllBtn.addEventListener("click", async () => {
    taskUl.querySelectorAll(".trash-icon").forEach(async task => {
        await removeData(task.id)
        await setData()

    })
})



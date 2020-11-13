const boxID = "box_f1b4aec33905771a9ab2"

// Voor diegene die hem nakijkt als je dit in de feedback zou willen doorgeven?
// Waarom logt die bij updateData() de data meer dan 1x?? Zie regel 70 tm 74


const apiUrl = `https://jsonbox.io/${boxID}/`


const getData = async () => {
    try {
        showSpinner()
        let response = await fetch(apiUrl, { method: "GET" });
        let data = await response.json();
        hideSpinner()
        return data
    } catch (error) {
        console.log(error)
    }


}

const postData = async (newTask) => {
    try {
        showSpinner()
        const data = { description: newTask, done: false };
        await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        hideSpinner()
    } catch (error) {
        console.log(error);
    }
};

const removeData = async (postID) => {
    try {
        showSpinner()
        await fetch(`${apiUrl}${postID}`, {
            method: "DELETE",
        })
        hideSpinner()
    } catch (error) {
        console.log(error);
    }
}


const updateData = async (postID, task, status) => {
    try {
        showSpinner()
        await fetch(`${apiUrl}${postID}`,
            {
                method: "PUT",
                body: JSON.stringify({ description: task, done: status, }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        hideSpinner()
    } catch (error) {
        console.log(error);
    }
}

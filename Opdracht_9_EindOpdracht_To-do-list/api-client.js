const boxID = "box_f1b4aec33905771a9ab2"

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
        console.log(data, "data logged to api")
        let response = await fetch(apiUrl, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        let result = await response.json()
        console.log(result);
        hideSpinner()

    } catch (error) {
        console.log(error);
    }
};

const removeData = async (postID) => {
    try {
        showSpinner()
        let response = await fetch(`${apiUrl}${postID}`, {
            method: "DELETE",
        })
        let result = await response.json()
        console.log(result);
        hideSpinner()
    } catch (error) {
        console.log(error);
    }
}


const updateData = async (postID, task, status) => {
    try {
        showSpinner()
        let response = await fetch(`${apiUrl}${postID}`,
            {
                method: "PUT",
                body: JSON.stringify({ description: task, done: status, }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        let result = await response.json()
        console.log(result);
        hideSpinner()
    } catch (error) {
        console.log(error);
    }
}

function makeRequest(method, url, body) {
    return new Promise(
        function (resolve, reject) {
            let req = new XMLHttpRequest();

            req.onload = function () {
                const data = JSON.parse(req.responseText);
                if (req.status >= 200 && req.status < 300) {
                    resolve(data);
                } else {
                    const reason = new Error('Rejected');
                    reject(reason);
                }
            };

            req.open(method, url);
            req.send(JSON.stringify(body));
        }
    );
}


function getItems() {

    makeRequest("GET", 'http://localhost:5000/item/all/')
        .then((data) => {

            const containerDiv = document.getElementById('random');
            let tableHeading = document.createElement('h2');
            tableHeading.id = "tableHeading";
            tableHeading.innerHTML = "Posts";
            containerDiv.appendChild(tableHeading);
            // if (document.contains(document.getElementById("table1"))) {
            //     containerDiv.removeChild(document.getElementById("table1"));
            //     containerDiv.removeChild(document.getElementById("tableHeading"));
            // }
            let container = document.createElement('table');
            container.id = "table1";
            containerDiv.appendChild(container);

            let tableHeadingTitle = document.createElement('th');
            tableHeadingTitle.innerHTML = "Username";
            container.appendChild(tableHeadingTitle);

            let tableHeadingTitle2 = document.createElement('th');
            tableHeadingTitle2.innerHTML = "Content";
            container.appendChild(tableHeadingTitle2);

            let tableHeadingTitle3 = document.createElement('th');
            tableHeadingTitle3.innerHTML = "Email";
            container.appendChild(tableHeadingTitle3);

            let tableHeadingRemovePost = document.createElement('th');
            tableHeadingRemovePost.innerHTML = "Delete";
            container.appendChild(tableHeadingRemovePost);

            for (let i = 0; i < data.length; i++) {
                let myRow = document.createElement('tr');

                myRow.id = "row" + i;
                container.appendChild(myRow);

                let myUsername = document.createElement('td');
                myUsername.innerHTML = String(data[i].username);
                myRow.appendChild(myUsername);

                let myContent = document.createElement('td');
                myContent.innerHTML = String(data[i].content);
                myRow.appendChild(myContent);

                let myEmail = document.createElement('td');
                myEmail.innerHTML = String(data[i].email);
                myRow.appendChild(myEmail);
                let email = data[i].email;
                console.log(data[i].email)

                let myRemovePost = document.createElement('td');
                myRow.appendChild(myRemovePost);
                let removePostbtn = document.createElement('input');
                removePostbtn.type = "button";
                removePostbtn.className = "btn btn-primary";
                removePostbtn.value = "Remove Post";
                let _id = data[i]._id;
                console.log(data[i]._id)

                removePostbtn.onclick = function () {
                    removePost(_id, email);
                };
                myRemovePost.appendChild(removePostbtn);

            }
        })
        .catch((error) => console.log(error.message));
    return false;
}

function removePost(ID, Email){
    let newBody = {
        _id: ID,
        email: Email
    };
    console.log(newBody);
    makeRequest('DELETE', 'http://localhost:5000/item/deleteItem/', newBody)
        .then(() => {
            console.log("you have deleted");
    })
    .catch((error) => {
        console.log(error.message);
    });
    return false;

}

function formValidation()
{ console.log(2);
    //const axios = require('axios');
	axios.get("http://127.0.0.1:3000/allTasks")
    //console.log(details);
    .then(function(response){
      console.log(response);
      addT(response.data)
    })
    .catch(function(error){
      //console.log(error);
    })
    .then(function(){

    });
  //  response.forEach(printt);
}

function addT(details) {
    $("#demo").empty();
    details.forEach(todofunc);
}

function todofunc(taskData) {
    var newElement1 = document.createElement('li');
    newElement1.className = 'flex-container2';

    var newETitle = document.createElement('span');
    newETitle.innerHTML = taskData.title;
    newETitle.className = 'fontbold';
    newElement1.appendChild(newETitle);

    var newEc = document.createElement('input');
    newEc.className = 'cb';
    newEc.type = 'checkbox';

    newEc.id = taskData.id;
    if (taskData.status) {
        newEc.checked = true;
    } else {
        newEc.checked = false;
    }
    if (taskData.status) {
        newElement1.id = 'linethrough';
    } else {
        newElement1.id = '';
    }

    newElement1.appendChild(newEc);

    newElement2 = document.createElement('div');
    newElement2.innerHTML = ' ' + taskData.desc + '<hr>';
    newElement1.appendChild(newElement2);
    var lii = document.getElementById('demo');
    lii.appendChild(newElement1);

    $("#" + taskData.id).change(function() {

        axios.put('http://127.0.0.1:3000/editTask', {
                id: taskData.id,
                status: !taskData.status,

            })
            .then(function(response) {
                getData()

            })
            .catch(function(error) {
                console.log(error);
            });

    })
}
function sear() {
    var input, filter;
    input = document.getElementById("myinp");
    filter = input.value.toUpperCase();

    axios.get("http://127.0.0.1:3000/allTasks")
        .then(function(response) {
            // handle success
            // console.log(response.data);
            let result = []
            response.data.map((sData) => {
                if (sData.title.toUpperCase().indexOf(filter) > -1) {
                    result.push(sData)
                }
            })
            console.log(result);
            addT(result);
        })
        .catch(function(error) {
            // handle error
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}


$('#Pndg').click(function() {
      axios.get("http://127.0.0.1:3000/allTasks")
      .then(function(response) {
        let result2 = [];
        response.data.map((sData) => {
          if (sData.status == false) {
            result2.push(sData)
          }
        })
        console.log(result2);
        addT(result2);
      })
      .catch(function(error) {
          console.log(error);
      })
      .then(function() {
            // always executed
      });
})

$('#cmplt').click(function() {
    axios.get("http://127.0.0.1:3000/allTasks")
    .then(function(response) {
    let result3 = [];
    response.data.map((sData) => {
      if (sData.status == true) {
        result3.push(sData)
      }
    })
      console.log(result3);
        addT(result3);
  })
    .catch(function(error) {
            // handle error
    console.log(error);
  })
  .then(function() {
            // always executed
  });
})

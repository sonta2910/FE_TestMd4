let arr;
function findAll() {
    $.ajax({
        url: "http://localhost:8080/cities",
        type: "GET",
        success(data) {
            let arr = data
            let context = `<table border="1"><tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Area</th>
                            <th>Population</th>
                            <th>GDP</th>
                            <th>Description</th>
                            <th>Nation</th>
                            <th colspan="2">Action</th>
                            </tr>`
            for (let i = 0; i < arr.length; i++) {
                context += `<tr>
                            <td>${i + 1}</td> 
                            <td><a href="#" onclick="detail(${arr[i].id})"> ${arr[i].name}</a></td>
                            <td>${arr[i].area}</td>
                            <td>${arr[i].population}</td>
                            <td>${arr[i].gpd}</td>
                            <td>${arr[i].description}</td>
                            <td>${arr[i].nation.name}</td>
                            <td><button class="btn btn-warning" onclick="updateForm(${arr[i].id})">Update</button></td>
                          
                            <td><button class="btn btn-danger" onclick="deleteCity(${arr[i].id})">Delete</button></td>
                            </tr>`
            }
            context += `</table>`
            document.getElementById("display").innerHTML = context
            $("#form").hide()
            $("#display").show()
        }
    })
}
function createForm() {
    let content = `<label><select id="nation"></label>`
    for (let i = 0; i < arr.length; i++) {
        content += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    content += `</select>`
    document.getElementById("nationss").innerHTML = content
    $("#name").val("")
    $("#area").val("")
    $("#population").val("")
    $("#gpd").val("")
    $("#description").val("")
    document.getElementById("title").innerHTML = "Create form"
    $("#form").show()
    document.getElementById("action").setAttribute("onclick", "createCity()")
    document.getElementById("action").innerHTML = "Create"
    $("#display").hide()
}

window.onload = getNations
function getNations() {
    $.ajax({
        url: "http://localhost:8080/cities/nations",
        type: "GET",
        success(data) {
            arr = data
        }
    })
}
function createCity(){
    let city = {
        name: $("#name").val(),
        area: $("#area").val(),
        population: $("#population").val(),
        gpd: $("#gpd").val(),
        description: $("#description").val(),
        nation: {
            id: $("#nation").val()
        }
        
    }
    if (name === "" || area === "" || population === "" || gpd === "" || description === "") {
        alert("Vui lòng điền đầy đủ thông tin vào các trường!");
        return;}
    $.ajax({
        url: "http://localhost:8080/cities",
        type: "POST",
        contentType: "application/json",
        accept: "application/json",
        data: JSON.stringify(city),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function updateForm(id){
    let content = `<label><select id="nation"></label>`
    for (let i = 0; i < arr.length; i++) {
        content += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    content += `</select>`
    document.getElementById("nationss").innerHTML = content
    $.ajax({
        url: `http://localhost:8080/cities/${id}`,
        type: "GET",
        success(data){
            $("#name").val(data.name)
            $("#area").val(data.area)
            $("#population").val(data.population)
            $("#gpd").val(data.gpd)
            $("#description").val(data.description)
            document.getElementById("title").innerHTML="Update form"
            $("#form").show()
            document.getElementById("action").setAttribute("onclick",`updateCity(${id})`)
            document.getElementById("action").innerHTML="Update"
            $("#display").hide()
        }
    })
}
function updateCity(id){
    let city = {
        id: id,
        name: $("#name").val(),
        area: $("#area").val(),
        population: $("#population").val(),
        gpd: $("#gpd").val(),
        description: $("#description").val(),
        nation: {
            id: $("#nation").val()
        }
    }
    $.ajax({
        url: "http://localhost:8080/cities",
        type: "POST",
        contentType: "application/json",
        accept: "application/json",
        data: JSON.stringify(city),
        success() {
            findAll()
        }
    })
    event.preventDefault()
}
function deleteCity(id) {
    if (confirm("Are You Sure To Delete This City?")) {
        $.ajax({
            url: `http://localhost:8080/cities/${id}`,
            type: "DELETE",
            success() {
                findAll()
            }
        })
    }
}
function detail(id){
    $.ajax({
        url: "http://localhost:8080/cities/" + id,
        type: "GET",
        success(data) {
            showDetail(data)
            $("#detail").show()
        }
    })
}
function showDetail(data){
    let context = ` <h1>City Detail</h1> 
                  <p>City Name: ${data.name} </p><br>
                  <p>Area: ${data.area} </p><br>
                  <p>Population: ${data.population} </p><br>
                  <p>GDP: ${data.gpd} </p><br>
                  <p>Description: ${data.description} </p><br>
                  <p>Nation:${data.nation.name} </p><br>
                  <button onclick="backHome()">Back</button>
                 `
    document.getElementById("detail").innerHTML = context
    $("#form").hide()
    $("#display").hide()

}

function backHome() {
    $("#form").hide()
    $("#detail").hide()
    $("#display").show()
    event.preventDefault()
}


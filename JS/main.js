var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var searchInput = document.getElementById("search");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updatedIndex;


var siteContainer = [];

if(localStorage.getItem("site")!== null){
    siteContainer = JSON.parse(localStorage.getItem("site"))
    displaySite(siteContainer)
}

function addSite() {
    var inputs = [siteName, siteUrl];
    var isValid = true;

    inputs.forEach(function(input) {
        validateInputs(input);
        if (!input.classList.contains("is-valid")) {
            isValid = false;
        }
    });

    if (isValid) {
        var site = {
            code: siteName.value,
            web: siteUrl.value,
        }

        siteContainer.push(site);
        localStorage.setItem("site", JSON.stringify(siteContainer));
        clearForm();
        displaySite(siteContainer);

        inputs.forEach(function(input) {
            input.classList.remove("is-valid");
        });
    }
}


function clearForm(){
    siteName.value = null;
    siteUrl.value = null;
}



function displaySite(arr){

    
    var siteBox = ``

    for (let i = 0; i < arr.length; i++) {
        var originalIndex = siteContainer.indexOf(arr[i])

        var link = arr[i].web;
        if (!link.startsWith("http://") && !link.startsWith("https://")) {
            link = "http://" + link;
        }


        siteBox += `
            <tr>
                <td>${i+1}</td>
                <td>${arr[i].code}</td>
                <td>                            
                <a href="${link}" target="_blank" class="btn btn-outline-primary btn-sm">
                    <i class="fa-solid fa-eye pe-sm-2 pe-0"></i>Visit
                </a>

                </td>
                
                <td>
                    <button onclick="setForUpdate(${originalIndex})" class="btn btn-outline-warning btn-sm">
                    <i class="fa-regular fa-pen-to-square pe-sm-2 pe-0"></i>Update
                    </button>
                </td>

                <td>
                    <button onclick="deleteSite(${originalIndex})" class="btn btn-outline-danger btn-sm">
                        <i class="fa-solid fa-trash-can pe-sm-2 pe-0"></i>Delete
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById("table-content").innerHTML = siteBox
}

function visitSite(url) {
    window.location.href = url;
}

function deleteSite(deletedIndex){
    siteContainer.splice(deletedIndex,1);
    localStorage.setItem("site",JSON.stringify(siteContainer));
    displaySite(siteContainer);
}

function search(){
    var term = searchInput.value;
    var searchSite = [];

    for (let i = 0; i < siteContainer.length; i++) {
        if(siteContainer[i].code.toLowerCase().includes(term.toLowerCase())){

            searchSite.push(siteContainer[i])
        }
        
    }
    displaySite(searchSite)
}



function setForUpdate(i){

    updatedIndex = i;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");

    siteName.value = siteContainer[i].code;
    siteUrl.value = siteContainer[i].web;
}


function update() {
    var updatedName = siteName.value;
    var updatedUrl = siteUrl.value;

    if (!isValidInput(updatedName, updatedUrl)) {
        return; 
    }

    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

    siteContainer[updatedIndex].code = updatedName;
    siteContainer[updatedIndex].web = updatedUrl;

    localStorage.setItem("site", JSON.stringify(siteContainer));
    displaySite(siteContainer);
    clearForm();

    siteName.classList.remove("is-valid", "is-invalid");
    siteUrl.classList.remove("is-valid", "is-invalid");
}

function isValidInput(name, url) {
    if (!/^[\w\s]{3,}$/.test(name)) {
        return false;
    }

    if (!/^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/.test(url)) {
        return false;
    }

    return true;
}


function validateInputs(element){


    var regex = {
        siteName : /^\w{3,}(\s+\w+)*\s?$/,
        siteUrl : /^(https?:\/\/)?(www\.)?[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/,      
    }

    

    if(regex[element.id].test(element.value) == true ){
        
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block", "d-none")

    } else{
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.replace("d-none", "d-block")
    }
    
}


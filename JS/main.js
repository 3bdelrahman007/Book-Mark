var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");
var searchInput = document.getElementById("search");


var siteContainer = [];

if(localStorage.getItem("site")!== null){
    siteContainer = JSON.parse(localStorage.getItem("site"))
    displaySite()
}

function addSite(){

    var site = {
        code : siteName.value
    }

    siteContainer.push(site)
    localStorage.setItem("site",JSON.stringify(siteContainer))
    clearForm()
    displaySite()
    console.log(siteContainer);
}

function clearForm(){
    siteName.value = null;
    siteUrl.value = null;
}

function displaySite(){
    var siteBox = ``

    for (let i = 0; i < siteContainer.length; i++) {
        siteBox += `
            <tr>
                <td>${i+1}</td>
                <td>${siteContainer[i].code}</td>
                <td>                            
                    <button class="btn btn-outline-primary">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button onclick="deleteSite(${i})" class="btn btn-outline-dark">
                        <i class="fa-solid fa-trash-can pe-2"></i>Delete
                    </button>
                </td>
            </tr>`;
    }
    document.getElementById("table-content").innerHTML = siteBox
}

function deleteSite(deletedIndex){
    siteContainer.splice(deletedIndex,1);
    localStorage.setItem("site",JSON.stringify(siteContainer));
    displaySite();
    console.log(siteContainer);
}

function search(){
    var term = searchInput.value;
    var siteBox = ``;
    for (let i = 0; i < siteContainer.length; i++) {
        if(siteContainer[i].code.toLowerCase().includes(term.toLowerCase())){
            siteBox += `
            <tr>
                <td>${i+1}</td>
                <td>${siteContainer[i].code}</td>
                <td>                            
                    <button class="btn btn-visit btn-outline-primary">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                </td>
                <td>
                    <button onclick="deleteSite(${i})" class="btn btn-outline-dark">
                        <i class="fa-solid fa-trash-can pe-2"></i>Delete
                    </button>
                </td>
            </tr>`;
        }
        
    }
    document.getElementById("table-content").innerHTML = siteBox;
}









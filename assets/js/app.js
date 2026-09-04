


let addMovieBtn = document.getElementById("addMovieBtn")
let movieContainer = document.getElementById("movieContainer")
let movieform = document.getElementById("movieform")
let moviename = document.getElementById("moviename")
let imgurl = document.getElementById("imgurl")
let description = document.getElementById("description")
let rating = document.getElementById("rating")
let Cancel = document.getElementById("Cancel")
let moviemodal = document.getElementById("moviemodal")
let closemodalBtn = document.getElementById("closemodalBtn")
let addmovie = document.getElementById("addmovie")
let Updatebtn = document.getElementById("Updatebtn")
let modaltitle = document.getElementById("modaltitle")



// let moviearr = [

//     {
//         name:"XXX",
//         img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAB2dMkEJSIPVtvzZ8P1KPn9ltBWTkFAs4E3bAHW5AGw&s=10",
//         description: "Xander Cage, an extreme sports athlete, is hired by the US Government to gather information on an organisation that may just be planning the destruction of the world.",
//         rating: "7",
//         id: "1"


//     }

// ]




//  localStorage.setItem("movies",JSON.stringify(moviearr))




let movies = JSON.parse(localStorage.getItem("movies")) || []


function showCard(arr) {
    let result = ``;
    arr.forEach(ele => {
        result += ` 

                    <div class="col-md-3" id="${ele.id}">
                         <div class="card mt-3 movieCard">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="movieTitle">${ele.name}</h4>
                                <h5><span class="badge badge-success">${ele.rating}</span></h5>
                            </div>
                            <div class="card-body">
                                  <figure class="py-0">
                                       <img src="${ele.img}" alt="${ele.name}" class="card-img">
                                        <figcaption>
                                             <h5>${ele.name}</h5>
                                             <p>${ele.description}</p>
                                        </figcaption>

                                    </figure>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                  <button onclick="onedit(this)" class="btn btn-sm net-sec-btn" data-edit-id="${ele.id}">Edit</button>
                                  <button onclick="ondelete(this)" class="btn btn-sm net-pri-btn" data-delete-id="${ele.id}">Delete</button>
                             </div>
                        </div>
                    </div>
        
        `


    })

    movieContainer.innerHTML = result;
}

showCard(movies)



function oncreate(ele) {
    ele.preventDefault()

    let movieobj = {

        name: moviename.value,
        img: imgurl.value,
        description: description.value,
        rating: rating.value,
        id: Date.now().toString()

    }

    movies.push(movieobj)
    movieform.reset()



    localStorage.setItem("movies",JSON.stringify(movies))




    let moviecol = document.createElement("div")

    moviecol.classList = "col-md-3"
    moviecol.id = movieobj.id
    moviecol.innerHTML = `

                         <div id="${movieobj.id}">
                         <div class="card mt-3 movieCard">
                            <div class="card-header d-flex justify-content-between">
                                <h4 class="movieTitle">${movieobj.name}</h4>
                                <h5><span class="badge badge-success">${movieobj.rating}</span></h5>
                            </div>
                            <div class="card-body">
                                  <figure class="py-0">
                                       <img src="${movieobj.img}" alt="${movieobj.name}" class="card-img">
                                        <figcaption>
                                             <h5>${movieobj.name}</h5>
                                             <p>${movieobj.description}</p>
                                        </figcaption>

                                    </figure>
                            </div>
                            <div class="card-footer d-flex justify-content-between">
                                  <button onclick="onedit(this)" class="btn btn-sm net-sec-btn" data-edit-id="${movieobj.id}">Edit</button>
                                  <button onclick="ondelete(this)" class="btn btn-sm net-primary-btn" data-delete-id="${movieobj.id}">Delete</button>
                             </div>
                        </div>
                    </div>
        
    
    
    `
    movieContainer.append(moviecol)

    movieform.reset()

    moviemodal.style.display = "none"

    Swal.fire({

        title:" Movie Added",
        icon:"success",
        timer:2000

    })
        
    

}


function onedit(ele) {
    let editid = ele.getAttribute("data-edit-id")
    editId = editid
    let editobj = movies.find(e => e.id === editid)

    moviename.value = editobj.name
    imgurl.value = editobj.img
    description.value = editobj.description
    rating.value = editobj.rating

    addmovie.classList.add("d-none")
    Updatebtn.classList.remove("d-none")


    moviemodal.style.display ="flex"

    modaltitle.innerText ="Update Movie"

    Updatebtn.setAttribute("data-edit-id",editid)
    

}

function onupdate() {
    let updateid = this.getAttribute("data-edit-id")

    

    let getindex = movies.findIndex(u => u.id === updateid)
    

        movies[getindex].name = moviename.value,
        movies[getindex].img = imgurl.value,
        movies[getindex].description = description.value,
        movies[getindex].rating = rating.value,
        

    localStorage.setItem("movies", JSON.stringify(movies));

    

    showCard(movies)

    Updatebtn.classList.add("d-none")
    addmovie.classList.remove("d-none")

    moviemodal.style.display = "none"
    modaltitle.innerText = "Add Movie"

    movieform.reset()

      Swal.fire({

        title:" Movie Update Successfully",
        icon:"success",
        timer:2000

    })
        
    

}

function ondelete(ele){

    let deleteid = ele.getAttribute("data-delete-id")

    let movieindex = movies.findIndex(d => d.id === deleteid)

    let confirmdelete = confirm(`are you sure you wont to delete movie ?`)

    if(!confirmdelete){
        return;
    }
    movies.splice(movieindex,1)

    localStorage.setItem("movies", JSON.stringify(movies))

    showCard(movies)

    Swal.fire({

       title:" Movie Delete Successfully",
        icon:"success",
        timer:2000

    })

}



movieform.addEventListener("submit", oncreate)
Updatebtn.addEventListener("click", onupdate)

addMovieBtn.addEventListener("click", function () {

    moviemodal.style.display = "flex"
})

closemodalBtn.addEventListener("click", function () {

    moviemodal.style.display = "none"


})

Cancel.addEventListener("click", function (){

    moviemodal.style.display ="none"

    movieform.reset()

})

 movieform.reset()









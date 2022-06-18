let postwrapper = document.querySelector('#post-holder');
let postForm = document.querySelector('#post-form');
let title = document.querySelector('#title')
let body = document.querySelector('#body')

let postBox = [];


function renderUI (arr) {
    let postHolder = '';
    arr.forEach(post => {
        postHolder += `
            <div class="col-md-6 p-5">
                <div class="card">
                    <div class="card-body">
                        <p>${post.id}</p>
                        <h1 id="post-title"><strong>${post.title}</h1></strong>
                        <p id="post-body">${post.body}</p>
                        <div class="d-flex justify-content-between button-container">
                            
                            <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                            <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        
      });
      postwrapper.innerHTML = postHolder;
}

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) =>{
      postBox = data
      renderUI(postBox)  
  } )
      

     

}
getPosts();

postForm.addEventListener('submit', createPost)

function createPost(e){
  
    e.preventDefault();
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title.value,
          body: body.value,
          userId: 2,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        postBox.unshift(data);
        console.log(postBox)
        let postHolder = ''
        postBox.forEach(post => {
            if(post.title !== "" && post.body !== ""){
                postHolder += `
                    <div class="col-md-6 p-5">
                        <div class="card">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h1 id="post-title"><strong>${post.title}</h1></strong>
                                <p id="post-body">${post.body}</p>
                                <div class="d-flex justify-content-between button-container">
                                    
                                    <button class="btn btn-primary" onclick="updatePost(${post.id})">Update</button>
                                    <button class="btn btn-danger" onclick="deletePost(${post.id})">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        }});   
         
        postwrapper.innerHTML = postHolder;
    
         
            
    });
}    

function updatePost(id){
    console.log(id);

 fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        id: id,
        title: title.value,
        body: body.value,
        userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
 })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        let postTitles = document.querySelectorAll('#post-title')
        let postBodies = document.querySelectorAll('#post-body')
        console.log(postTitles)
        postTitles.forEach((postTitle, index) => {
            if(index + 1 === id){
                if(data.title !== ""){
                    postTitle.innerHTML = data.title
                }
               
            }
        })
        postBodies.forEach((postBody, index) => {
            if(index + 1 === id){
                if(data.body !== ""){
                    postBody.innerHTML = data.body
                }
            }
        })
    }); 
}




function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        postBox = postBox.filter(post => post.id !== id)
        console.log(postBox)
        renderUI(postBox)
    })
    
}


const scrollUp = document.querySelector('#back-to-top');

const refreshButtonVisibility = () => {
    if( document.documentElement.scrollTop < 150) {
        scrollUp.style.display = "none"
    }else{
        scrollUp.style.display = "block"
    }
}
refreshButtonVisibility();
scrollUp.addEventListener('click' , () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

});
document,addEventListener('scroll', (e) => {
   refreshButtonVisibility();

});

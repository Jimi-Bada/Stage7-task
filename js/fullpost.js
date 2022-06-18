function renderBlogPost() {
    let newPost = localStorage.getItem('viewedPost')
    console.log(newPost);
    let post = JSON.parse(newPost)
    console.log(post)
    // console.log(post.title)
    document.getElementById('post-id').innerHTML = post.id
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post.body').innerHTML = post.body
      console.log(post.title)
}
renderBlogPost();
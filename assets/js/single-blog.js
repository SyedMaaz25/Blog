const displaySingleBlog = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const getBlog = JSON.parse(localStorage.getItem("blog")) || [];
  const matchedBlog = getBlog.find((blog) => blog.id === Number(id));
  const singleBlogContainer = document.getElementById("single-blog-container");

  if (!matchedBlog) {
    singleBlogContainer.innerHTML = "<h1>Blog length is 0</h1>";
  } else {
    singleBlogContainer.innerHTML = `
    <div class="container">
  <div class="row align-items-center">
    <div class="col-md-6 col-12">
    <img src="${matchedBlog.image}" alt="${matchedBlog.name}" class="img-fluid rounded" width="100%">
    </div>
    <div class="col-md-6 col-12">
      <h3 class="pt-4">${matchedBlog.name}</h3>
      <p class="pt-2 my-0">${matchedBlog.description}</p>
      <p class="pt-1 my-0">${matchedBlog.longDescription ? matchedBlog.longDescription : "Long description is empty"}</p>
    </div>
  </div>
    </div>`;
  }
};

displaySingleBlog();
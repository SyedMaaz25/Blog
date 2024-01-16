const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const displaySingleBlog = () => {
  const getBlog = JSON.parse(localStorage.getItem("blog")) || [];
  const matchedBlog = getBlog.find((blog) => blog.id === Number(id));
  const singleBlogContainer = document.getElementById("single-blog-container");

  if (!matchedBlog) {
    singleBlogContainer.innerHTML = "<p>Blog length is 0</p>";
  } else {
    singleBlogContainer.innerHTML = ` <div class="container py-md-5 py-5">
    <img src="${matchedBlog.image}" alt="${matchedBlog.name}" class="imgfluid rounded" width="100%">
    <h3 class="pt-4">${matchedBlog.name}</h3>
    <p class="pt-2 my-0">${matchedBlog.description}</p>
    <p class="pt-1 my-0">${matchedBlog.longDescription ? matchedBlog.longDescription : ""}</p>
    </p>
    </div>`;
  }
};

displaySingleBlog();
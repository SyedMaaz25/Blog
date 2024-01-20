const postsUrl = "http://localhost:3000/posts";
const submitBlog = document.getElementById("submit-blog");
const blogInput = document.querySelectorAll(".blog-input");
const alertError = document.getElementById("alert-error");
const userBlog = {};
let isFieldEmpty = false;

const handleBlog = () => {
  if (submitBlog.innerHTML === "Update Blog") {
    handleUpdateBlog();
  } else {
    handleAddBlog();
  }
};

const handleDb = async (userBlog) => {
  try {
    const response = await fetch(postsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBlog),
    });
    const blogDetails = await response.json();
    handleLocalStorage(blogDetails);
  } catch (error) {
    throw error;
  }
};

const handleLocalStorage = (blogDetails) => {
  const storedBlog = JSON.parse(localStorage.getItem("blog")) || [];
  storedBlog.push(blogDetails);
  localStorage.setItem("blog", JSON.stringify(storedBlog));
};

const displayBlog = () => {
  const blogContainer = document.getElementById("blog-container");
  const getBlog = JSON.parse(localStorage.getItem("blog")) || [];
  const blogHtml = getBlog.map(({ id, image, name, description, longDescription }) => {
      const blogDetails = { id, image, name, description, longDescription };
      return `<div class="col-12 col-sm-6 col-md-5 col-lg-4 pb-md-1 pb-2 g-3">
      <div class="card">
        <img src="${image}" class="card-img-top img-fluid blog-image" alt=${name}>
        <div class="card-body">
          <h4 class="card-title">${name}</h4>
          <p class="card-text">${description}</p>
          <div class="d-flex align-items-center gap-3">
          <button class="card-text my-0 py-0" onclick="handleReadMore(${id})">Read More</button>
          <button class="card-text my-0 py-0" onclick='handleUpdateInputFields(${JSON.stringify(
            blogDetails
          )})'>Update</button>
          <button class="card-text my-0 py-0 delete" onclick="handleDelete(${id})">Delete</button>
          </div>
        </div>
      </div>
    </div>`;
    }
  );

  blogContainer.innerHTML = `<div class="row">${blogHtml.join("")}</div>`;
};

const handleReadMore = (id) => {
  window.location.href = `single-blog.html?id=${id}`;
};

const handleDelete = async (id) => {
  try {
    await fetch(`${postsUrl}/${id}`, {
      method: "DELETE",
    });
    const getBlog = JSON.parse(localStorage.getItem("blog")) || [];
    const deleteBlog = getBlog.filter((blog) => blog.id !== id);
    localStorage.setItem("blog", JSON.stringify(deleteBlog));
    displayBlog();
  } catch (error) {
    throw error;
  }
};

const handleAddBlog = () => {
  blogInput.forEach((input) => {
    if (input.value === "") {
      alertError.style.display = "block";
      alertError.innerHTML = "Add blog fields are empty";
      isFieldEmpty = false;
    } else {
      alertError.style.display = "none";
      userBlog[input.id] = input.value;
      input.value = "";
      isFieldEmpty = true;
    }
  });

  if (isFieldEmpty) {
    handleDb(userBlog);
  }
};

const handleUpdateInputFields = (blogDetails) => {
  submitBlog.innerHTML = "Update Blog";
  blogInput.forEach((input) => {
    const inputId = input.id;
    if (inputId in blogDetails) {
      input.value = blogDetails[inputId];
    }
  });
  const id = blogDetails.id;
  localStorage.setItem("id", JSON.parse(id));
};

const handleUpdateBlog = () => {
  submitBlog.innerHTML = "Add Blog";
  blogInput.forEach((input) => {
    userBlog[input.id] = input.value;
    input.value = "";
  });
  const id = JSON.parse(localStorage.getItem("id")) || [];
  handleUpdateDb(id, userBlog);
};

const handleUpdateDb = async (id, updatedUserBlog) => {
  try {
    const response = await fetch(`${postsUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUserBlog),
    });
    const updatedBlogDetails = await response.json();
    updateLocalStorage(updatedBlogDetails);
  } catch (error) {
    throw error;
  }
};

const updateLocalStorage = (updatedUserBlog) => {
  const getBlog = JSON.parse(localStorage.getItem("blog")) || [];
  const updatedBlogIndex = getBlog.findIndex((blog) => blog.id === updatedUserBlog.id);
  if (updatedBlogIndex !== -1) {
    getBlog[updatedBlogIndex] = updatedUserBlog;
    localStorage.setItem("blog", JSON.stringify(getBlog));
    displayBlog();
  }
};

displayBlog();
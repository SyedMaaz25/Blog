const commentsUrl = "http://localhost:3000/comments";

const handleComment = () => {
  const input = document.querySelectorAll(".comment-input");
  const blogComments = {};
  input.forEach((input) => {
    blogComments[input.id] = input.value;
    input.value = ""
  });
  handleDb(blogComments);
};

const handleDb = async (blogComments) => {
  try {
    const response = await fetch(commentsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogComments),
    });
    const comments = await response.json();
    updateLocalStorage(comments);
  } catch (error) {
    throw error;
  }
};

const updateLocalStorage = (comments) => {
  const getComments = JSON.parse(localStorage.getItem("comments")) || [];
  getComments.push(comments);
  localStorage.setItem("comments", JSON.stringify(getComments));
};

const displayComments = () => {
  const commentsContainer = document.getElementById("comments-container");
  const getComments = JSON.parse(localStorage.getItem("comments")) || [];
  const getName = JSON.parse(localStorage.getItem("name")) || [];

  const commentHtml = getComments?.map((comment) => {
    return `<div class="pb-3">
    <div class="d-flex gap-3">
    <div class="dropdown">
    <i class="fa-solid fa-ellipsis" data-bs-toggle="dropdown" aria-expanded="false"></i>
    <ul class="dropdown-menu">
      <li class="dropdown-item" onclick="handleDelete(${comment.id})">Delete</li>
      <li class="dropdown-item" onclick="handleUpdate()">Update</li>
    </ul>
  </div>
    <h4>${getName}</h4>
    </div>
    <p class="pt-2">${comment.message}</p>
    </div>`;
  });

  commentsContainer.innerHTML = commentHtml.join("");
};

const handleDelete = async (id) => {
  try {
    await fetch(`${commentsUrl}/${id}`, {
      method: "DELETE",
    });
    const getComments = JSON.parse(localStorage.getItem("comments")) || [];
    const deleteComment = getComments.filter((comment) => comment.id !== id);
    localStorage.setItem("comments", JSON.stringify(deleteComment));
    displayComments();
  } catch (error) {
    throw error;
  }
};

const handleUpdate = () => {
  alert("We will hanlde later");
};

displayComments();
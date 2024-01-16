const userUrl = "http://localhost:3000/users";

const handleLogin = () => {
  const formFields = document.querySelectorAll(".form-input");
  const alertError = document.getElementById("alert-error");
  const userForm = {};
  let isFieldEmpty = false;

  formFields.forEach((input) => {
    if (input.value === "") {
      alertError.style.display = "block";
      alertError.innerHTML = "Fields are empty";
    } else {
      alertError.style.display = "none";
      userForm[input.id] = input.value;
      input.value = "";
      isFieldEmpty = true;
    }
  });

  if (isFieldEmpty) {
    handleDb(userForm)
  }
};

const handleDb = async (userForm) => {
  try {
    const response = await fetch(userUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    });
    const userDetails = await response.json();
    handleLocalStorage(userDetails);
  } catch (error) {
    throw error;
  }
};

const handleLocalStorage = (userDetails) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  storedUsers.push(userDetails);
  localStorage.setItem("users", JSON.stringify(storedUsers));
  window.location.replace("blog.html");
};
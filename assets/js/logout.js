const userUrl = "http://localhost:3000/users";

const handleLogout = async () => {
  try {
    const id = 1;
    await fetch(`${userUrl}/${id}`, {
      method: "DELETE",
    });
    localStorage.removeItem("users");
    window.location.replace("index.html");
  } catch (error) {
    throw error;
  }
};
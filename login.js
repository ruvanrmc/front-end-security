document.getElementById( "loginForm" ).addEventListener( "submit", async ( e ) => {
  e.preventDefault();

  const username = document.getElementById( "username" ).value;
  const password = document.getElementById( "password" ).value;

  const res = await fetch( "/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (res.ok) {
    const data = await res.json();
    sessionStorage.setItem( "token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert( "Invalid username or password!");
  }
});


/*
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/login", {
    method: 'POST',
    headers: { " Content-Type": "application/json" }, 
    body: JSON.stringify({username, password})

  });

  if (res.ok) {
    const data = await res.json();
    sessionStorage.setItem("token", data.token);
    window.localStorage.href = "dashboard.html";
  } else {
    alert("Invalid username or password ! ");
  }

});
*/
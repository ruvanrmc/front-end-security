async function verifyToken() {
  const token = sessionStorage.getItem( "token" );
  if ( !token ) return false;

  const res = await fetch( "/api/verify", {
    headers: { Authorization: `Bearer ${ token }` }
  });

  const data = await res.json();
  return data.valid;
}

verifyToken().then(valid => {
  if ( !valid ) {
    alert( "Session expired or unauthorized. Please log in again." );
    window.location.href = "index.html";
  } else {
    import( './utils.js' ).then(module => {
      module.showMessage();
    });

    document.getElementById( "logout" ).addEventListener( "click", () => {
      sessionStorage.removeItem( "token" );
      window.location.href = "index.html";
    });
  }
});



/*
async function verifyToken() {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  const res = await res.fetch("/api/verify", {
    headers: { Authorization: `Bearer ${token}`}
  });
  const data = await res.json();
  return data.valid;
}

varifyToken().then(valid => {
  if (!valid) {
    alert("Session expited or unathorized. Please log in again. ");
    window.location.href = "index.html";
  } else {
    import('./utils.js').then(module => {
      module.showMessage();
    });

    document.getElementById("logout").addEventListener('click', () => {
      sessionStorage.removeItem("token");
      window.location.href = "index.html";
    });
  }
});
*/
window.onload = (event) => {
      const token = localStorage.getItem("token")
      console.log(token)
    const routes = [
        { path: "/", handler: homeHandler },
        { path: "/index.html", handler: homeHandler },
        { path: "/login.html", handler: loginHandler },
        { path: "/signup.html", handler: signupHandler },
    ]

    handleRoutes();

    function handleRoutes () {
        const currentPath = window.location.pathname;
        const routeData = routes.find(route => route.path === currentPath);

        if (routeData) {
            routeData.handler();
        } else {
            homeHandler();
        }
    }

    function homeHandler () {
        console.log("Home")
    }

    function loginHandler () {
        const form = document.getElementById("login-form");
        console.log(form)
        const url = "http://127.0.0.1:5000/login";

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            sendRequestToServer(form, url)
            .then(data => {
                localStorage.setItem("token", data["token"])
                console.log(data["token"])
            })
            .catch(error => console.error(error))
        });
    }

    function signupHandler () {
        console.log("signupHandler")
    }


    function sendRequestToServer (form, url) {

      const formData = new FormData(form);
      const data = {};
      const token = localStorage.getItem("token")
      console.log(token)

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      return new Promise ((resolve, reject) => {
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': "Bearer" + token
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => resolve(data))
          .catch( (error) => {
              console.log(error, "errorrrrrrrrrrr");
              reject(error);
          })
      })
    }


//    form.addEventListener('submit', (event) => {
//      event.preventDefault();
//    });


    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const today_date = `${year}-${month}-${day}`;


    const apiUrl = `http://127.0.0.1:5000/get_events_by/${today_date}`

    fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
                console.log(data);
            })
          .catch(error => {
            console.error('Error:', error);
          });

}
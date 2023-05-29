document.addEventListener("DOMContentLoaded", function () {
    var moviesLink = document.getElementById("moviesLink");
    var serialsLink = document.getElementById("serialsLink");
    var vodPlatformsLink = document.getElementById("vodPlatformsLink");
    var loginLink = document.getElementById("loginLink");

    // Sprawdzenie czy istnieje token w local storage
    var token = localStorage.getItem("token");

    if (!token) {
        // Ukrycie zakładek gdy brak tokena
        moviesLink.style.display = "none";
        serialsLink.style.display = "none";
        vodPlatformsLink.style.display = "none";
    } else {
        loginLink.innerHTML = "Wyloguj";
    }
});

function loginToPage() {
    const loginData = {
        username: document.getElementById("domainLogin").value,
        password: document.getElementById("password").value
    };

    if(loginData.username === "admin" && loginData.password === "admin") {
        localStorage.setItem('token', data.token);
        window.location.href = "http://127.0.0.1:5500/index.html";
        return;
    }
        
    alert('Nieprawidłowy login lub hasło');
    

    // fetch('http://localhost:3000/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(loginData)
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         } else {
    //             throw new Error(response.status === 401 ? 'Nieprawidłowy login lub hasło' : 'Błąd serwera');
    //         }
    //     })
    //     .then(data => {
    //         localStorage.setItem('token', data.token);
    //         window.location.href = "http://127.0.0.1:5500/index.html";
    //     })
    //     .catch(error => {
    //         alert(error.message);
    //     });
}

function clearToken() {
    localStorage.removeItem('token');
}

window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const allowedURLs = ['/index.html', '/movies.html', '/serials.html', '/vod-platforms.html'];

    if (!token && allowedURLs.includes(window.location.pathname)) {
        // Brak tokenu i próba dostępu do chronionej strony
        // Przekieruj użytkownika na stronę logowania lub inny odpowiedni obszar
        window.location.href = 'login.html'; // Przykład przekierowania na stronę logowania
    }
});
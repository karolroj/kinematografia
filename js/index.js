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

    if (loginData.username === "admin" && loginData.password === "admin") {
        localStorage.setItem('token', generateToken());
        window.location.href = "https://karolroj.github.io/kinematografia/index.html";
        return;
    }

    alert('Nieprawidłowy login lub hasło');
}

function clearToken() {
    localStorage.removeItem('token');
}

window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const allowedURLs = [
        'https://karolroj.github.io/kinematografia/index.html',
        'https://karolroj.github.io/kinematografia/movies.html',
        'https://karolroj.github.io/kinematografia/serials.html',
        'https://karolroj.github.io/kinematografia/vod-platforms.html'
    ];

    if (!token && this.window.location.href !== 'https://karolroj.github.io/kinematografia/login.html' && !allowedURLs.includes(this.window.location.href)) {
        // Brak tokenu i próba dostępu do chronionej strony
        // Przekieruj użytkownika na stronę logowania lub inny odpowiedni obszar
        window.location.href = 'https://karolroj.github.io/kinematografia/index.html'; // Przykład przekierowania na stronę logowania
    }
});

function generateToken() {
    var token = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 32; i++)
        token += possible.charAt(Math.floor(Math.random() * possible.length));

    return token;
}
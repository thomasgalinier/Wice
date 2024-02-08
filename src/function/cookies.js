// Fonction pour stocker le token JWT dans un cookie sécurisé
export function saveToken(token) {
    document.cookie = `authToken=${token}; Secure; HttpOnly; SameSite=Strict`;
  }
  
  // Fonction pour vérifier si l'utilisateur est connecté
 export  function isLoggedIn() {
    return document.cookie.split(';').some((cookie) => cookie.trim().startsWith('authToken='));
  }
  
  // Fonction pour récupérer le token JWT depuis le cookie sécurisé
  export function getToken() {
    const authTokenCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('authToken='));
    if (authTokenCookie) {
      return authTokenCookie.split('=')[1];
    }
    return null;
  }
  
  // Fonction pour supprimer le token JWT du cookie sécurisé lors de la déconnexion
  export function logout() {
    document.cookie = 'authToken=; Max-Age=0; Secure; HttpOnly; SameSite=Strict';
  }
  
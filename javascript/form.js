function validerLeFormulaire() {
  // Récupérer les valeurs des champs
  const nom = document.getElementById('nom').value;
  const prenom = document.getElementById('prenom').value;
  const email = document.getElementById('email').value;

  const bouton = document.getElementById('submit');
  
  // Regex pour validation
  const nameRegex = /^[A-Za-z\s]+$/; // Permet seulement les lettres et les espaces
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format d'e-mail valide
  
  // Réinitialiser les messages d'erreur
  document.getElementById('lastname-error').textContent = '';
  document.getElementById('firstname-error').textContent = '';
  document.getElementById('email-error').textContent = '';
  
  // Valider les champs
  let isValid = true;
  
  if (!nameRegex.test(nom)) {
    document.getElementById('lastname-error').textContent = 'Votre nom doit seulement contenir des lettres et des espaces';
    nom.style.border = 'red 1px solid';
    isValid = false;
  }
  
  if (!nameRegex.test(prenom)) {
    document.getElementById('firstname-error').textContent = 'Votre prénom doit seulement contenir des lettres et des espaces';
    prenom.style.border = 'red 1px solid';
    isValid = false;
  }
  
  if (!emailRegex.test(email)) {
    document.getElementById('email-error').textContent = 'Votre e-mail doit contenir un @ et un .';
    email.style.border = 'red 1px solid';
    isValid = false;
  }
  
  return isValid;
}

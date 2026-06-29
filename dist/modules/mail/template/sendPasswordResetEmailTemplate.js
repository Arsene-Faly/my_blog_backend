"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmailTemplate = void 0;
const sendPasswordResetEmailTemplate = (username, resetUrl) => `
<!DOCTYPE html>
<html lang="fr">
<head>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Réinitialisation de votre mot de passe</title>


  <style>

    body {
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }


    .container {
      max-width: 600px;
      margin: 40px auto;
      background: white;
      padding: 30px;
      border-radius: 10px;
    }


    .header {
      text-align: center;
      margin-bottom: 30px;
    }


    .header h2 {
      color: #333;
    }


    .content {
      color: #555;
      line-height: 1.6;
    }


    .button {

      display: inline-block;
      margin-top: 20px;
      padding: 12px 25px;

      background-color: #2563eb;

      color: white !important;

      text-decoration: none;

      border-radius: 6px;

    }


    .warning {

      margin-top:20px;

      padding:15px;

      background:#fef3c7;

      border-radius:6px;

      color:#92400e;

      font-size:14px;

    }


    .footer {

      margin-top:30px;

      font-size:12px;

      color:#888;

      text-align:center;

    }


  </style>


</head>


<body>


<div class="container">


  <div class="header">

    <h2>
      Bonjour ${username} 👋
    </h2>

  </div>



  <div class="content">


    <p>
      Nous avons reçu une demande de réinitialisation
      de votre mot de passe.
    </p>



    <p>

      Si vous êtes à l'origine de cette demande,
      cliquez sur le bouton ci-dessous pour créer
      un nouveau mot de passe :

    </p>




    <a
      href="${resetUrl}"
      class="button"
    >
      Réinitialiser mon mot de passe
    </a>




    <div class="warning">

      Ce lien est temporaire et expirera pour des raisons
      de sécurité.

    </div>




    <p>

      Si vous n'avez pas demandé cette modification,
      vous pouvez ignorer cet email.
      Votre mot de passe restera inchangé.

    </p>



  </div>




  <div class="footer">


    Cet email a été envoyé automatiquement,

    merci de ne pas répondre.



  </div>



</div>



</body>

</html>
`;
exports.sendPasswordResetEmailTemplate = sendPasswordResetEmailTemplate;
//# sourceMappingURL=sendPasswordResetEmailTemplate.js.map
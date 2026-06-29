export const verifyEmailTemplate = (
  username: string,
  verificationUrl: string
) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Vérification de votre compte</title>

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

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }
  </style>

</head>

<body>

<div class="container">

  <div class="header">
    <h2>Bienvenue ${username} 👋</h2>
  </div>


  <div class="content">

    <p>
      Merci pour votre inscription.
    </p>

    <p>
      Pour activer votre compte, veuillez confirmer votre adresse email
      en cliquant sur le bouton ci-dessous :
    </p>


    <a 
      href="${verificationUrl}" 
      class="button"
    >
      Vérifier mon compte
    </a>


    <p>
      Si vous n'êtes pas à l'origine de cette inscription,
      vous pouvez ignorer cet email.
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
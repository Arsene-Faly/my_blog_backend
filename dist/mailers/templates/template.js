"use strict";
// templates/verifyEmail.template.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailTemplate = void 0;
const verifyEmailTemplate = ({ url, brandColor = "#3B82F6", // Bleu par défaut
brandName = "Notre Application", userFirstName = "Utilisateur" }) => {
    const html = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vérification de votre adresse email</title>
            <style>
                /* Styles généraux */
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                    background-color: #f8fafc;
                    margin: 0;
                    padding: 0;
                    -webkit-font-smoothing: antialiased;
                }
                
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                    overflow: hidden;
                }
                
                /* En-tête */
                .header {
                    background: linear-gradient(135deg, ${brandColor}, ${adjustColor(brandColor, -20)});
                    padding: 40px 30px;
                    text-align: center;
                }
                
                .header h1 {
                    color: #ffffff;
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                    letter-spacing: -0.5px;
                }
                
                .header .brand {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 14px;
                    margin-top: 8px;
                    opacity: 0.9;
                }
                
                /* Contenu */
                .content {
                    padding: 40px 30px;
                }
                
                .content h2 {
                    color: #1e293b;
                    font-size: 22px;
                    font-weight: 600;
                    margin: 0 0 16px 0;
                }
                
                .content p {
                    color: #475569;
                    font-size: 16px;
                    line-height: 1.7;
                    margin: 0 0 20px 0;
                }
                
                .content .greeting {
                    font-size: 18px;
                    font-weight: 500;
                    color: #0f172a;
                }
                
                /* Bouton */
                .button-container {
                    text-align: center;
                    margin: 32px 0;
                }
                
                .button {
                    display: inline-block;
                    background-color: ${brandColor};
                    color: #ffffff !important;
                    font-size: 16px;
                    font-weight: 600;
                    text-decoration: none;
                    padding: 14px 40px;
                    border-radius: 8px;
                    transition: all 0.2s ease;
                    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);
                }
                
                .button:hover {
                    background-color: ${adjustColor(brandColor, -20)};
                    transform: translateY(-2px);
                    box-shadow: 0 8px 12px -1px rgba(59, 130, 246, 0.4);
                }
                
                /* URL alternative */
                .fallback-link {
                    margin: 24px 0;
                    padding: 16px;
                    background-color: #f1f5f9;
                    border-radius: 8px;
                    border-left: 4px solid ${brandColor};
                }
                
                .fallback-link p {
                    color: #64748b;
                    font-size: 14px;
                    margin: 0 0 8px 0;
                }
                
                .fallback-link .url {
                    color: ${brandColor};
                    font-size: 14px;
                    word-break: break-all;
                    font-family: 'Courier New', monospace;
                    background-color: #ffffff;
                    padding: 8px 12px;
                    border-radius: 4px;
                    display: block;
                    border: 1px solid #e2e8f0;
                }
                
                /* Informations supplémentaires */
                .info-box {
                    background-color: #f8fafc;
                    border-radius: 8px;
                    padding: 16px 20px;
                    margin: 24px 0;
                    border: 1px solid #e2e8f0;
                }
                
                .info-box p {
                    font-size: 14px;
                    color: #64748b;
                    margin: 0;
                }
                
                .info-box strong {
                    color: #0f172a;
                }
                
                /* Pied de page */
                .footer {
                    padding: 30px 30px 20px;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                }
                
                .footer p {
                    color: #94a3b8;
                    font-size: 13px;
                    line-height: 1.6;
                    margin: 0 0 8px 0;
                }
                
                .footer .links a {
                    color: #94a3b8;
                    text-decoration: none;
                    margin: 0 12px;
                    font-size: 13px;
                }
                
                .footer .links a:hover {
                    color: ${brandColor};
                    text-decoration: underline;
                }
                
                /* Responsive */
                @media (max-width: 480px) {
                    .container {
                        margin: 20px auto;
                        border-radius: 12px;
                    }
                    
                    .content {
                        padding: 30px 20px;
                    }
                    
                    .header {
                        padding: 30px 20px;
                    }
                    
                    .header h1 {
                        font-size: 24px;
                    }
                    
                    .button {
                        padding: 12px 32px;
                        font-size: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <!-- En-tête -->
                <div class="header">
                    <h1>Vérification de l'email</h1>
                    <div class="brand">${brandName}</div>
                </div>
                
                <!-- Contenu principal -->
                <div class="content">
                    <p class="greeting">Bonjour ${userFirstName} 👋</p>
                    
                    <h2>Confirmez votre adresse email</h2>
                    
                    <p>
                        Merci d'avoir créé un compte sur <strong>${brandName}</strong>. 
                        Pour finaliser votre inscription et sécuriser votre compte, 
                        veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
                    </p>
                    
                    <!-- Bouton de vérification -->
                    <div class="button-container">
                        <a href="${url}" class="button">
                            ✓ Vérifier mon email
                        </a>
                    </div>
                    
                    <!-- Lien alternatif -->
                    <div class="fallback-link">
                        <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
                        <span class="url">${url}</span>
                    </div>
                    
                    <!-- Informations utiles -->
                    <div class="info-box">
                        <p>
                            ⏱️ <strong>Ce lien expirera dans 24 heures</strong>
                            <br>
                            🔒 Pour des raisons de sécurité, ne partagez pas ce lien avec d'autres personnes.
                        </p>
                    </div>
                    
                    <p style="color: #94a3b8; font-size: 14px;">
                        Si vous n'avez pas créé de compte sur ${brandName}, vous pouvez ignorer cet email.
                    </p>
                </div>
                
                <!-- Pied de page -->
                <div class="footer">
                    <p>
                        © ${new Date().getFullYear()} ${brandName}. Tous droits réservés.
                    </p>
                    <div class="links">
                        <a href="#">Support</a>
                        <a href="#">Confidentialité</a>
                        <a href="#">Conditions</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
    const text = `
        Vérification de votre adresse email - ${brandName}
        
        Bonjour ${userFirstName},
        
        Merci d'avoir créé un compte sur ${brandName}. Pour finaliser votre inscription, veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :
        
        ${url}
        
        Ce lien expirera dans 24 heures.
        
        Pour des raisons de sécurité, ne partagez pas ce lien avec d'autres personnes.
        
        Si vous n'avez pas créé de compte sur ${brandName}, vous pouvez ignorer cet email.
        
        ---
        © ${new Date().getFullYear()} ${brandName}. Tous droits réservés.
    `;
    return { html, text };
};
exports.verifyEmailTemplate = verifyEmailTemplate;
// Fonction utilitaire pour assombrir/éclaircir une couleur
function adjustColor(hex, amount) {
    let color = hex.replace('#', '');
    if (color.length === 3) {
        color = color.split('').map(c => c + c).join('');
    }
    let r = parseInt(color.substring(0, 2), 16);
    let g = parseInt(color.substring(2, 4), 16);
    let b = parseInt(color.substring(4, 6), 16);
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    return `#${[r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')}`;
}
//# sourceMappingURL=template.js.map
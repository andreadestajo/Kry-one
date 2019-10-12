exports.emailVerificationTemplate = (name, link) =>
    `
        <h4>Hi! ${name}</h4> 
        
        <p>Thanks for registering an account with <b>Kryptoone</b>! 
        Before we get started, please verify your email address by clicking the link below.</p>
        
        <p>
            <a href="${link}">${link}</a>
        </p>
        
        <p>If you did not create an account using this address, please ignore this email.</p>
    `;

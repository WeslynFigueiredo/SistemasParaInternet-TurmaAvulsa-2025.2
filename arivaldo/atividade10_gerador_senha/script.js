document.addEventListener('DOMContentLoaded', function() {
    const passwordDisplay = document.getElementById('passwordDisplay');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const strengthFill = document.getElementById('strengthFill');
    const notification = document.getElementById('notification');
    
    // Caracteres que serão usados para gerar a senha
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    
    // Combina todos os caracteres
    const allCharacters = uppercase + lowercase + numbers;
    
    // Função para gerar senha aleatória
    function generatePassword() {
        let password = '';
        
        // Garante que a senha tenha pelo menos um de cada tipo de caractere
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        
        // Preenche o restante da senha com caracteres aleatórios
        for (let i = 0; i < 5; i++) {
            password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
        }
        
        // Embaralha a senha
        password = password.split('').sort(() => Math.random() - 0.5).join('');
        
        return password;
    }
    
    // Função para avaliar a força da senha
    function checkPasswordStrength(password) {
        // Verifica o comprimento e variedade de caracteres
        let strength = 0;
        
        if (password.length >= 8) strength += 20;
        
        // Verifica se contém letras maiúsculas
        if (/[A-Z]/.test(password)) strength += 25;
        
        // Verifica se contém letras minúsculas
        if (/[a-z]/.test(password)) strength += 25;
        
        // Verifica se contém números
        if (/[0-9]/.test(password)) strength += 30;
        
        // Atualiza a barra de força
        strengthFill.style.width = strength + '%';
        
        // Altera a cor baseada na força
        if (strength < 50) {
            strengthFill.style.backgroundColor = '#ff4d4d';
        } else if (strength < 80) {
            strengthFill.style.backgroundColor = '#ffa64d';
        } else {
            strengthFill.style.backgroundColor = '#2ecc71';
        }
    }
    
    // Função para copiar a senha
    function copyToClipboard() {
        const password = passwordDisplay.textContent.replace('Clique no botão para gerar', '').trim();
        
        if (!password) return;
        
        navigator.clipboard.writeText(password).then(() => {
            // Mostra notificação
            notification.classList.add('show');
            
            // Esconde a notificação após 2 segundos
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        });
    }
    
    // Evento para gerar nova senha
    generateBtn.addEventListener('click', () => {
        const newPassword = generatePassword();
        passwordDisplay.textContent = newPassword;
        passwordDisplay.appendChild(copyBtn);
        checkPasswordStrength(newPassword);
    });
    
    // Evento para copiar a senha
    copyBtn.addEventListener('click', copyToClipboard);
    
    // Gerar uma senha inicial
    generateBtn.click();
});
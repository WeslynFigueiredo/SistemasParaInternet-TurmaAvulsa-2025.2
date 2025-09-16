document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('validationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Elementos dos campos
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const phoneInput = document.getElementById('phone');
    const birthdateInput = document.getElementById('birthdate');
    
    // Elementos de mensagens de erro
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const phoneError = document.getElementById('phoneError');
    const birthdateError = document.getElementById('birthdateError');
    
    // Funções de validação
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameError, 'O nome é obrigatório');
            return false;
        }
        
        if (name.length < 3) {
            showError(nameError, 'O nome deve ter pelo menos 3 caracteres');
            return false;
        }
        
        hideError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email === '') {
            showError(emailError, 'O e-mail é obrigatório');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            showError(emailError, 'Por favor, insira um e-mail válido');
            return false;
        }
        
        hideError(emailError);
        return true;
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            showError(passwordError, 'A senha é obrigatória');
            return false;
        }
        
        if (password.length < 6) {
            showError(passwordError, 'A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        
        hideError(passwordError);
        return true;
    }
    
    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        if (confirmPassword === '') {
            showError(confirmPasswordError, 'Por favor, confirme sua senha');
            return false;
        }
        
        if (password !== confirmPassword) {
            showError(confirmPasswordError, 'As senhas não coincidem');
            return false;
        }
        
        hideError(confirmPasswordError);
        return true;
    }
    
    function validatePhone() {
        const phone = phoneInput.value.trim();
        const phoneRegex = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;
        
        if (phone === '') {
            showError(phoneError, 'O telefone é obrigatório');
            return false;
        }
        
        if (!phoneRegex.test(phone)) {
            showError(phoneError, 'Por favor, insira um telefone válido (ex: (11) 99999-9999)');
            return false;
        }
        
        hideError(phoneError);
        return true;
    }
    
    function validateBirthdate() {
        const birthdate = new Date(birthdateInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDiff = today.getMonth() - birthdate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
            age--;
        }
        
        if (!birthdateInput.value) {
            showError(birthdateError, 'A data de nascimento é obrigatória');
            return false;
        }
        
        if (age < 18) {
            showError(birthdateError, 'Você deve ter pelo menos 18 anos');
            return false;
        }
        
        hideError(birthdateError);
        return true;
    }
    
    // Funções auxiliares para mostrar/ocultar erros
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }
    
    // Adicionar event listeners para validação em tempo real
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    phoneInput.addEventListener('input', function() {
        // Máscara de telefone
        let value = phoneInput.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 0) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            if (value.length > 10) {
                value = value.replace(/(\d{5})(\d)/, '$1-$2');
            } else {
                value = value.replace(/(\d{4})(\d)/, '$1-$2');
            }
        }
        
        phoneInput.value = value;
        validatePhone();
    });
    
    birthdateInput.addEventListener('change', validateBirthdate);
    
    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isPhoneValid = validatePhone();
        const isBirthdateValid = validateBirthdate();
        
        if (isNameValid && isEmailValid && isPasswordValid && 
            isConfirmPasswordValid && isPhoneValid && isBirthdateValid) {
            // Mostrar mensagem de sucesso
            successMessage.style.display = 'block';
            
            // Limpar formulário
            form.reset();
            
            // Ocultar mensagem de sucesso após 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
});
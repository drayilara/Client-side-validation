
function errorMessages() {
    let userNameError = `Please enter a username between 3 and 25 characters in length`;
    let passWordValidityError = `Password must contain at least 8 characters including at least 1 uppercase, 1 lower case, 1 number and 1 special character in this set(!@#$%^&*)`;
    let passwordMatchError = `Password must match.`
    let emailError = `Please enter a valid email`;

    return {userNameError, passWordValidityError, passwordMatchError, emailError};
}

function getElements() {
    let titleField = document.getElementById("title");
    let usernameField = document.getElementById("username");
    let passwordField = document.getElementById("password");
    let emailField = document.getElementById("email");
    let passwordMatchField = document.getElementById("confirm-password");
    let form = document.getElementById("signup");
    let submitBtn = document.getElementById("submitBtn");

    return {titleField, usernameField, passwordField, emailField, passwordMatchField, form, submitBtn};
}

function getSmallElements() {
    let allSmalls = document.querySelectorAll("small");

    let usernameSmall = allSmalls[0];
    let emailSmall = allSmalls[1];
    let passwordSmall = allSmalls[2];
    let passwordMatchSmall = allSmalls[3];

    return {usernameSmall, emailSmall, passwordSmall, passwordMatchSmall};
}


function validateUsername(username) {

    if(username.length < 3 || username.length > 25) {
            return false;
    } else {
            return true;
    }
}

function validateEmail(email) {

    // Email validation is not a small deal.This implementation will get 99.99% of all emails in existence today.
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    if(regex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword(password) {

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if(regex.test(password)) {
        return true;
    }else {
        return false;
    }
}

function reValidatePassword(matchPassword, password) {

    if(validatePassword(matchPassword)) {
        if(password == matchPassword) {
            return true;
        }
    } else {
        return false;
    }
}

function run() {

        let { userNameError, passWordValidityError, passwordMatchError, emailError } = errorMessages();

        let { titleField, usernameField, passwordField, emailField, passwordMatchField, form, submitBtn } = getElements();

        let {usernameSmall, emailSmall, passwordSmall, passwordMatchSmall} = getSmallElements();

        let successMsg = `You have successfully signed up`;
        let errorMessage = `There was a problem submitting your form`;


        form.addEventListener("submit", (e) => {

            let password = passwordField.value;
            let matchPassword = passwordMatchField.value;
            let email = emailField.value;
            let username  = usernameField.value;

            // validate username

            let isUsername = validateUsername(username);

            // validate email

            let isEmail = validateEmail(email);

            // validate password

            let isPassword = validatePassword(password);

            // revalidate password

            let isConfirmPassword = reValidatePassword(matchPassword, password);


            // show customised error messages

            if(isUsername && isEmail && isPassword && isConfirmPassword) {
                titleField.classList.add("success");
                titleField.textContent =  successMsg;
                usernameSmall.textContent = "";
                emailSmall.textContent = "";
                passwordSmall.textContent = "";
                passwordMatchSmall.textContent = "";
                // Ideally, you should call form.submit() here, not preventDefault,but this is a test app with no backend.

                e.preventDefault();
                return;
            }

            // Here the user credentials is not ok

            titleField.classList.remove("success");
            titleField.textContent = errorMessage;

            if(!isUsername) {
                usernameSmall.classList.add("failure-small-color");
                usernameSmall.textContent = userNameError;
            }

            if(!isEmail) {
                emailSmall.classList.add("failure-small-color");
                emailSmall.textContent = emailError;
            }

            if(!isPassword) {
                passwordSmall.classList.add("failure-small-color");
                passwordSmall.textContent = passWordValidityError;
            }

            if(!isConfirmPassword) {
                passwordMatchSmall.classList.add("failure-small-color");
                passwordMatchSmall.textContent = passwordMatchError;
            }


            e.preventDefault();
        })
}


run();
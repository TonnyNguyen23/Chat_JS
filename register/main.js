function Validator(options) {
    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorMessage = rule.test(inputElement.value)
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    if(errorMessage) {
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    } else {
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
    }
    // Lấy element của form
    var formElement = document.querySelector(options.form);
    if(formElement) {
        options.rules.forEach(rule => {
            var inputElement = formElement.querySelector(rule.selector) 
            if(inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule)
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                     errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                    // inputElement.parentElement.classList.add('not-invalid')   
                }
            }
        });
    }
}


// Định nghĩa rules
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        }
    }
}
Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value) {
            var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return regex.test(value) ? undefined : 'Trường này phải là email'
        }
    }
}
Validator.minLength = function(selector, min) {
    return {
        selector: selector,
        test: function(value) {
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ký tự`
        }
    }
}
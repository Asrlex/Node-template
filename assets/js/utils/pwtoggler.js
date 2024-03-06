addEventListener('DOMContentLoaded', function() {
    let togglers = document.querySelectorAll('.password-toggler');
    console.log(togglers.length);
    togglers.forEach(password => {
        password.addEventListener('click', function() {
            console.log('click');
            console.log(this.dataset.target);
            let input = document.querySelector(`#${this.dataset.target}`);
            if(input.type === 'password'){
                input.type = 'text';
            } else {
                input.type = 'password';
            }
        });
    });
});
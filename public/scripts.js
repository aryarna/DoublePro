document.addEventListener('DOMContentLoaded', function () {
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.querySelectorAll('.progressbar li');

    let formStepIndex = 0;

    nextBtns.forEach((button) => {
        button.addEventListener('click', () => {
            if (validateForm()) {
                formStepIndex++;
                updateFormSteps();
                updateProgressBar();
            }
        });
    });

    prevBtns.forEach((button) => {
        button.addEventListener('click', () => {
            formStepIndex--;
            updateFormSteps();
            updateProgressBar();
        });
    });

    function updateFormSteps() {
        formSteps.forEach((formStep) => {
            formStep.classList.contains('active') && formStep.classList.remove('active');
        });
        formSteps[formStepIndex].classList.add('active');
    }

    function updateProgressBar() {
        progressBar.forEach((step, idx) => {
            if (idx <= formStepIndex) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const currentInputs = formSteps[formStepIndex].querySelectorAll('input');
        currentInputs.forEach(input => {
            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
        });
        return isValid;
    }

    // Submit form
    document.getElementById('multi-step-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const json = JSON.stringify(Object.fromEntries(formData));

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/success.html'; // Redirect to the success page
            } else {
                return response.json().then(data => {
                    throw new Error(data.error);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message);
        });
    });
});

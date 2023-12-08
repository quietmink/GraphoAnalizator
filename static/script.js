document.addEventListener('DOMContentLoaded', function () {
    const resultContainer = document.getElementById('result-text');
    const fetchButton = document.getElementById('fetch-button');

    fetchButton.addEventListener('click', function () {
        fetch('/api/result')
            .then(response => response.json())
            .then(data => {
                resultContainer.textContent = `Numba: ${data.result}`;
            })
            .catch(error => {
                console.error('Error fetching result:', error);
                resultContainer.textContent = 'Error fetching result';
            });
    });
});
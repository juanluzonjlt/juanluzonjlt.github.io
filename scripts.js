document.addEventListener('DOMContentLoaded', () => {
    // Botones de nivel
    const levelButtons = document.querySelectorAll('.level-button');
    const backButton = document.querySelector('.back-button');
    const topicsContainers = {
        easy: document.getElementById('easyTopics'),
        medium: document.getElementById('mediumTopics'),
        hard: document.getElementById('hardTopics')
    };

    // Mostrar temas según el nivel seleccionado
    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const level = button.classList.contains('easy') ? 'easy' :
                          button.classList.contains('medium') ? 'medium' : 'hard';

            // Ocultar el contenedor de niveles y mostrar los temas
            document.querySelector('.buttons-container').style.display = 'none';
            backButton.style.display = 'block';

            Object.values(topicsContainers).forEach(container => {
                container.style.display = 'none';
            });
            topicsContainers[level].style.display = 'grid';
        });
    });

    // Volver al inicio
    backButton.addEventListener('click', () => {
        document.querySelector('.buttons-container').style.display = 'grid';
        backButton.style.display = 'none';

        Object.values(topicsContainers).forEach(container => {
            container.style.display = 'none';
        });
    });
});


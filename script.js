 document.addEventListener("DOMContentLoaded", () => {
    const themeLight = document.getElementById('theme-light');
    const themeDark = document.getElementById('theme-dark');
    const themeBlue = document.getElementById('theme-blue');
    const themeGreen = document.getElementById('theme-green');
    const body = document.body;

    themeLight.addEventListener('click', () => {
        body.classList.remove('theme-dark', 'theme-blue', 'theme-green');
        body.classList.add('theme-light');
    });

    themeDark.addEventListener('click', () => {
        body.classList.remove('theme-light', 'theme-blue', 'theme-green');
        body.classList.add('theme-dark');
    });

    themeBlue.addEventListener('click', () => {
        body.classList.remove('theme-light', 'theme-dark', 'theme-green');
        body.classList.add('theme-blue');
    });

    themeGreen.addEventListener('click', () => {
        body.classList.remove('theme-light', 'theme-dark', 'theme-blue');
        body.classList.add('theme-green');
    });

    function markAsRead(element) {
        element.classList.toggle('read');
    }

    const photoForm = document.getElementById('photo-form');
    const photoSection = document.getElementById('photo-section');

    photoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const photoUrl = document.getElementById('photo-url').value;
        if (photoUrl) {
            const photoDiv = document.createElement('div');
            photoDiv.classList.add('relative', 'group', 'mb-4');

            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = 'Daily Life';
            img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-lg', 'transition-transform', 'transform', 'hover:scale-105');

            const textarea = document.createElement('textarea');
            textarea.classList.add('absolute', 'inset-0', 'p-4', 'opacity-0', 'group-hover:opacity-100', 'bg-black', 'bg-opacity-75', 'text-white', 'rounded-lg', 'transition-opacity');

            photoDiv.appendChild(img);
            photoDiv.appendChild(textarea);

            photoSection.appendChild(photoDiv);

            document.getElementById('photo-url').value = '';
        }
    });

    document.querySelectorAll('#blog-section p').forEach(paragraph => {
        paragraph.addEventListener('click', () => {
            markAsRead(paragraph);
        });
    });
});

 document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const createNewBlogButton = document.getElementById('create-new-blog');
    const createBlogSection = document.getElementById('create-blog-section');
    const blogForm = document.getElementById('blog-form');
    const blogSection = document.getElementById('blog-section');
    const body = document.body;

    // Toggle between light and dark themes
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            body.classList.add('light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
        }
    });

    // Show the blog creation form
    createNewBlogButton.addEventListener('click', () => {
        createBlogSection.classList.toggle('hidden');
    });

    // Add a new blog post
    blogForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('blog-title').value;
        const content = document.getElementById('blog-content').value;
        const imageUrl = document.getElementById('blog-image').value;

        if (title && content && imageUrl) {
            const article = document.createElement('article');
            article.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-lg', 'mt-4');

            const h3 = document.createElement('h3');
            h3.classList.add('text-2xl', 'font-semibold', 'mb-2');
            h3.textContent = title;

            const img = document.createElement('img');
            img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-lg', 'mb-4');
            img.src = imageUrl;
            img.alt = 'Blog Image';

            const p = document.createElement('p');
            p.classList.add('text-lg');
            p.textContent = content;
            p.addEventListener('click', () => {
                p.classList.toggle('read');
            });

            article.appendChild(h3);
            article.appendChild(img);
            article.appendChild(p);

            blogSection.appendChild(article);

            blogForm.reset();
            createBlogSection.classList.add('hidden');
        }
    });
});

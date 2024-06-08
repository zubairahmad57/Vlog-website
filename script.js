 document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById('theme-toggle');
    const createNewBlogButton = document.getElementById('create-new-blog');
    const createBlogSection = document.getElementById('create-blog-section');
    const blogForm = document.getElementById('blog-form');
    const blogSection = document.getElementById('blog-section');
    const body = document.body;

    // Load blogs from localStorage
    loadBlogs();

    // Toggle between light and dark themes
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        if (body.classList.contains('dark')) {
            themeToggle.textContent = '🌞';
        } else {
            themeToggle.textContent = '🌗';
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
        const imageInput = document.getElementById('blog-image');
        const audioInput = document.getElementById('blog-audio');
        const imageUrl = URL.createObjectURL(imageInput.files[0]);
        let audioUrl = null;

        if (audioInput.files.length > 0) {
            audioUrl = URL.createObjectURL(audioInput.files[0]);
        }

        if (title && content && imageUrl) {
            const blogPost = {
                id: new Date().getTime(),
                title,
                content,
                imageUrl,
                audioUrl,
                likes: 0,
                comments: []
            };

            saveBlog(blogPost);
            appendBlogPost(blogPost);

            blogForm.reset();
            createBlogSection.classList.add('hidden');
        }
    });

    // Save blog post to localStorage
    function saveBlog(blogPost) {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.push(blogPost);
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }

    // Load blog posts from localStorage
    function loadBlogs() {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs.forEach(blog => {
            appendBlogPost(blog);
        });
    }

    // Append blog post to the blog section
    function appendBlogPost(blog) {
        const article = document.createElement('article');
        article.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-lg', 'mt-4');
        article.setAttribute('data-id', blog.id);

        const h3 = document.createElement('h3');
        h3.classList.add('text-2xl', 'font-semibold', 'mb-2');
        h3.textContent = blog.title;

        const img = document.createElement('img');
        img.classList.add('w-full', 'h-auto', 'rounded-lg', 'shadow-lg', 'mb-4');
        img.src = blog.imageUrl;
        img.alt = 'Blog Image';

        if (blog.audioUrl) {
            const audio = document.createElement('audio');
            audio.controls = true;
            const source = document.createElement('source');
            source.src = blog.audioUrl;
            source.type = 'audio/mpeg';
            audio.appendChild(source);
            article.appendChild(audio);
        }

        const p = document.createElement('p');
        p.classList.add('text-lg', 'mb-4');
        p.textContent = blog.content;
        p.addEventListener('click', () => {
            p.classList.toggle('read');
        });

        const actions = document.createElement('div');
        actions.classList.add('blog-actions', 'flex', 'justify-between', 'items-center');

        const likeButton = document.createElement('button');
        likeButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/></svg>';
        likeButton.addEventListener('click', () => {
            blog.likes++;
            saveBlogToLocalStorage(blog);
            updateBlogPostLikes(blog);
        });

        const commentButton = document.createElement('button');
        commentButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"/></svg>';
        commentButton.addEventListener('click', () => {
            const comment = prompt('Enter your comment:');
            if (comment) {
                blog.comments.push(comment);
                saveBlogToLocalStorage(blog);
                updateBlogPostComments(blog);
            }
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6M4 6h16M10 6v1m4-1v1M8 6v1m8-1v1M9 6h6"/></svg>';
        deleteButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this blog?')) {
                deleteBlog(blog.id);
                article.remove();
            }
        });

        const saveButton = document.createElement('button');
        saveButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11l7-7 7 7M5 19h14"/></svg>';
        saveButton.addEventListener('click', () => {
            alert('Blog saved!');
        });

        actions.appendChild(likeButton);
        actions.appendChild(commentButton);
        actions.appendChild(deleteButton);
        actions.appendChild(saveButton);

        const likes = document.createElement('div');
        likes.classList.add('likes', 'text-sm');
        likes.textContent = `${blog.likes} likes`;
        actions.appendChild(likes);

        article.appendChild(h3);
        article.appendChild(img);
        article.appendChild(p);
        article.appendChild(actions);

        blogSection.appendChild(article);
    }

    // Save blog to localStorage
    function saveBlogToLocalStorage(blog) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs = blogs.map(b => (b.id === blog.id ? blog : b));
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }

    // Update blog post likes
    function updateBlogPostLikes(blog) {
        const article = document.querySelector(`article[data-id="${blog.id}"]`);
        const likes = article.querySelector('.likes');
        likes.textContent = `${blog.likes} likes`;
    }

    // Update blog post comments
    function updateBlogPostComments(blog) {
        // You can implement comment display and updating logic here
        alert('Comments updated!');
    }

    // Delete blog from localStorage
    function deleteBlog(id) {
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        blogs = blogs.filter(b => b.id !== id);
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }
});

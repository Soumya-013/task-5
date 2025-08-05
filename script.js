let isAdmin = false;

function toggleAdmin() {
    isAdmin = !isAdmin;
    const adminStatus = document.getElementById('admin-status');
    const adminBtn = document.querySelector('.admin-btn');
    const body = document.body;

    if (isAdmin) {
        adminStatus.textContent = 'ON';
        adminBtn.classList.add('admin-active');
        body.classList.add('admin-mode');
    } else {
        adminStatus.textContent = 'OFF';
        adminBtn.classList.remove('admin-active');
        body.classList.remove('admin-mode');
    }
}

function deleteComment(btn) {
    if (!isAdmin) {
        alert('Please enable Admin mode to delete comments');
        return;
    }

    if (confirm('Delete this comment?')) {
        btn.closest('.comment').remove();

        // Check if no comments left
        const commentsList = document.getElementById('comments-list');
        if (commentsList.children.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
        }
    }
}

document.getElementById('comment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const commentText = document.getElementById('comment').value.trim();

    if (!name || !commentText) return;

    const commentsList = document.getElementById('comments-list');

    // Remove no comments message
    const noComments = commentsList.querySelector('.no-comments');
    if (noComments) {
        noComments.remove();
    }

    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${name}</span>
            <div>
                <span class="comment-date">Just now</span>
                <button class="delete-btn" onclick="deleteComment(this)">Delete</button>
            </div>
        </div>
        <div class="comment-text">${commentText}</div>
    `;

    commentsList.insertBefore(newComment, commentsList.firstChild);

    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('comment').value = '';
});

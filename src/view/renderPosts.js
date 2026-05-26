export const renderPosts = ({ posts, container }) => {
  if (posts.length === 0) {
    container.innerHTML = '';
    return;
  }

  const postsHtml = posts
    .map(
      (post) => `
        <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
          <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.title}</a>
          <button type="button" class="btn btn-outline-primary btn-sm">Просмотр</button>
        </li>
      `
    )
    .join('');

  container.innerHTML = `
    <div class="card border-0">
      <div class="card-body">
        <h2 class="card-title h4">Посты</h2>
      </div>
      <ul class="list-group border-0 rounded-0">
        ${postsHtml}
      </ul>
    </div>
  `;
};

import 'bootstrap/js/dist/modal.js';

export const renderPosts = ({ posts, viewedPostsIds, container }) => {
  if (posts.length === 0) {
    container.innerHTML = '';
    return;
  }

  const postsHtml = posts
    .map((post) => {
      const isViewed = viewedPostsIds.includes(post.id);
      const linkClass = isViewed ? 'fw-normal link-secondary' : 'fw-bold';

      return `
        <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-end-0">
          <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="${linkClass}">${post.title}</a>
          
          <button type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal-${post.id}" data-post-id="${post.id}">Просмотр</button>
          
          <div class="modal fade" id="modal-${post.id}" tabindex="-1" aria-labelledby="modal-${post.id}-label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modal-${post.id}-label">${post.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${post.description}
                    </div>
                    <div class="modal-footer">
                        <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Читать полностью</a>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                    </div>
                </div>
            </div>
          </div>
        </li>
      `;
    })
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

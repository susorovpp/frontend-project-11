import 'bootstrap/js/dist/modal.js';

export const renderModal = ({ currentPostId, posts, container }) => {
  const currentPost = posts.find((post) => post.id === currentPostId);

  if (!currentPost) {
    return;
  }

  container.querySelector('.modal-title').textContent = currentPost.title;
  container.querySelector('.modal-body').innerHTML = currentPost.description;
  container.querySelector('.modal-footer a').href = currentPost.link;
};

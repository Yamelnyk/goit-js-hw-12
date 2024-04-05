// Описаний у документації

export function imgTemplate(img) {
  return img
    .map(image => {
      return `<div class="card">
        <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <ul class="list">
            <li class="item">Likes: <span>${image.likes}</span></li>
            <li class="item">Views: <span>${image.views}</span></li>
            <li class="item">Comments: <span>${image.comments}</span></li>
            <li class="item">Downloads: <span>${image.downloads}</span></li>
          </ul>
          </div>`;
    })
    .join('');
}

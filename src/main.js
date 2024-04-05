import { getImage } from './js/pixabay-api';
import { imgTemplate } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loadElem: document.querySelector('.loader'),
  btnLoadMore: document.querySelector('.js-btn-load'),
};

let query;
let currentPage = 1;
let maxPage = 0;
const pageSize = 14;

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMoreClick);

async function onFormSubmit(e) {
  e.preventDefault();
  showLoader();

  query = refs.formEl.elements.searchImages.value.trim();
  refs.gallery.innerHTML = '';
  currentPage = 1;
  if (!query.length) {
    iziToast.error({
      color: 'yellow',
      message: ` Please fill in the field for search query.`,
      position: 'topRight',
    });
  }
  try {
    const data = await getImage(query, currentPage);

    maxPage = Math.ceil(data.total / pageSize);
    if (!data.hits.length) {
      iziToast.error({
        color: 'red',
        message: `❌ Sorry, there are no images matching your search query. Please try again!`,
        position: 'topRight',
      });
    }

    const markup = imgTemplate(data.hits);

    refs.gallery.insertAdjacentHTML('beforeend', markup);

    showLoadMore();

    let simplGallery = new SimpleLightbox('.gallery a');
    simplGallery.refresh();
  } catch (err) {
    console.log(err);
  }

  hideLoader();
  checkBtnStatus();
  refs.formEl.reset();
}

async function onLoadMoreClick() {
  showLoader();
  currentPage += 1;
  const data = await getImage(query, currentPage);

  const markup = imgTemplate(data.hits);

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  hideLoader();
  checkBtnStatus();
}

function checkBtnStatus() {
  if (currentPage >= maxPage) {
    hideLoadMore();
  } else {
    showLoadMore();
  }
}

function showLoadMore() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideLoadMore() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader() {
  refs.loadElem.classList.remove('hidden');
}

function hideLoader() {
  refs.loadElem.classList.add('hidden');
}

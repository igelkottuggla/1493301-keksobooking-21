'use strict';
const {addForm} = window.form;
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const FILE_EXTENSIONS = [`gif`, `jpg`, `jpeg`, `png`];
const PHOTO_DESCRIPTION = `Фотография Вашего жилья`;

const avatarPhotoInput = addForm.querySelector(`#avatar`);
const accomodationPhotoInput = addForm.querySelector(`#images`);
const avatarPhotoPreview = addForm.querySelector(`.ad-form-header__preview img`);
const accomodationPhotoContainer = addForm.querySelector(`.ad-form__photo-container`);
const accomodationPhotoBlock = accomodationPhotoContainer.querySelector(`.ad-form__photo`);

const stylesForPreview = {
  images: {
    default: {
      width: `40px`,
      height: `44px`,
      borderRadius: `0`,
      marginLeft: `0`,
    },
    edited: {
      width: `70px`,
      height: `70px`,
      borderRadius: `5px`,
      marginLeft: `-15px`,
    },
  }
};

const pickUpFile = (file, upload) => {
  const fileName = file.name.toLowerCase();

  const approved = FILE_EXTENSIONS.some((ending) => fileName.endsWith(ending));

  if (approved) {
    upload(file);
  }
};

const imposeStyle = (element, styles) => {
  element.setAttribute(`width`, styles.width);
  element.setAttribute(`height`, styles.height);

  element.style.width = styles.width;
  element.style.height = styles.height;
  element.style.borderRadius = styles.borderRadius;
  element.style.objectFit = `cover`;
};

const uploadUserAvatar = (file) => {
  const amendedStyles = stylesForPreview.images.edited;

  const onUploadAvatar = () => {
    URL.revokeObjectURL(avatarPhotoPreview.src);
    avatarPhotoPreview.removeEventListener(`load`, onUploadAvatar);
  };

  avatarPhotoPreview.addEventListener(`load`, onUploadAvatar);
  avatarPhotoPreview.src = URL.createObjectURL(file);

  imposeStyle(avatarPhotoPreview, amendedStyles);
  avatarPhotoPreview.style.marginLeft = amendedStyles.marginLeft;
};

const uploadAccomodationPhoto = (fileName) => {
  const divElement = document.createElement(`div`);
  divElement.classList.add(`ad-form__photo`);
  accomodationPhotoContainer.appendChild(divElement);
  const imageElement = document.createElement(`img`);
  const amendedStyles = stylesForPreview.images.edited;

  const onUploadAccomodationPhoto = () => {
    URL.revokeObjectURL(imageElement.src);
    imageElement.removeEventListener(`load`, onUploadAccomodationPhoto);
  };

  imageElement.addEventListener(`load`, onUploadAccomodationPhoto);
  imageElement.src = URL.createObjectURL(fileName);

  imposeStyle(imageElement, amendedStyles);
  imageElement.setAttribute(`alt`, PHOTO_DESCRIPTION);

  accomodationPhotoBlock.remove();
  divElement.appendChild(imageElement);
};

const onChangeAvatar = () => {
  pickUpFile(avatarPhotoInput.files[0], uploadUserAvatar);
};

const onChangeAccomodationPhoto = () => {
  pickUpFile(accomodationPhotoInput.files[0], uploadAccomodationPhoto);
};

const makePhotosEnabled = () => {
  avatarPhotoInput.addEventListener(`change`, onChangeAvatar);
  accomodationPhotoInput.addEventListener(`change`, onChangeAccomodationPhoto);
};

const makePhotosDisabled = () => {
  const defaultStyles = stylesForPreview.images.default;

  avatarPhotoPreview.style.width = defaultStyles.width;
  avatarPhotoPreview.style.height = defaultStyles.height;
  avatarPhotoPreview.style.borderRadius = defaultStyles.borderRadius;
  avatarPhotoPreview.style.marginLeft = defaultStyles.marginLeft;
  avatarPhotoPreview.src = DEFAULT_AVATAR;

  const photoContainers = addForm.querySelectorAll(`.ad-form__photo`);
  photoContainers.forEach((container) => {
    container.remove();
  });

  accomodationPhotoContainer.appendChild(accomodationPhotoBlock);

  avatarPhotoInput.removeEventListener(`change`, onChangeAvatar);
  accomodationPhotoInput.removeEventListener(`change`, onChangeAccomodationPhoto);
};

window.images = {
  makePhotosDisabled,
  makePhotosEnabled,
};

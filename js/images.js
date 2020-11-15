'use strict';
const {template} = window.form;
const FILE_EXTENSIONS = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_AVATAR = `img/muffin-grey.svg`;
const PHOTO_DESCRIPTION = `Фотография Вашего жилья`;

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

const avatarPhotoInput = template.querySelector(`.ad-form__field input[type=file]`);
const avatarPhotoPreview = template.querySelector(`.ad-form-header__preview img`);
const accomodationPhotoInput = template.querySelector(`.ad-form__upload input[type=file]`);
const accomodationPhotoPreview = template.querySelector(`.ad-form__photo`);

const imposeStyle = (photos, styles) => {
  photos.style.width = styles.width;
  photos.style.height = styles.height;
  photos.style.borderRadius = styles.borderRadius;
};

const getPhotos = (fileInputs, previewPhoto) => {
  const file = fileInputs.files[0];
  const fileName = file.name.toLowerCase();

  const approved = FILE_EXTENSIONS.some((it) => {
    return fileName.endsWith(it);
  });

  if (approved) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      previewPhoto.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const onChangeAvatarPhoto = () => {
  const amendedStyles = stylesForPreview.images.edited;
  imposeStyle(avatarPhotoPreview, amendedStyles);
  avatarPhotoPreview.style.marginLeft = amendedStyles.marginLeft;
  getPhotos(avatarPhotoInput, avatarPhotoPreview);
};

const onChangeAccomodationPhoto = () => {
  if (!accomodationPhotoPreview.querySelector(`img`)) {
    const picture = document.createElement(`img`);
    picture.style.width = `100%`;
    picture.style.height = `100%`;
    picture.style.borderRadius = `5px`;
    picture.alt = PHOTO_DESCRIPTION;
    accomodationPhotoPreview.appendChild(picture);
  }
  const photoPreview = template.querySelector(`.ad-form__photo img`);
  getPhotos(accomodationPhotoInput, photoPreview);
};

const clearPhotos = () => {
  const defaultStyles = stylesForPreview.images.default;
  imposeStyle(avatarPhotoPreview, defaultStyles);
  avatarPhotoPreview.style.marginLeft = defaultStyles.marginLeft;
  avatarPhotoPreview.src = DEFAULT_AVATAR;
  if (accomodationPhotoPreview.querySelector(`img`)) {
    accomodationPhotoPreview.firstChild.remove();
  }
};

avatarPhotoInput.addEventListener(`change`, onChangeAvatarPhoto);
accomodationPhotoInput.addEventListener(`change`, onChangeAccomodationPhoto);

window.images = {
  clearPhotos,
};

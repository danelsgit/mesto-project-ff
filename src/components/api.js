const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-3",
  headers: {
    authorization: "aa02977b-4f82-44ca-a642-e35263506e3d",
    "Content-Type": "application/json",
  },
};

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => getResponse(res));
};

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => getResponse(res));
};

const getInfo = () => {
  return Promise.all([getUserInfo(), getInitialCards()]);
};

const updateUserProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userData.name,
      about: userData.about,
    }),
  }).then((res) => getResponse(res));
};

const postNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  }).then((res) => getResponse(res));
};

const applyLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResponse(res));
};

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponse(res));
};

const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResponse(res));
};

const updateUserAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => getResponse(res));
};

export {
  getInitialCards,
  getUserInfo,
  getInfo,
  updateUserProfile,
  postNewCard,
  applyLike,
  deleteLike,
  deleteCard,
  updateUserAvatar,
};

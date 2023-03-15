export default class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileDescription.textContent,
      avatar: this._profileAvatar.src,
    };
  }

  setUserInfo({ name, info, avatar }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = info;
    this._profileAvatar.src = avatar;
  }
}

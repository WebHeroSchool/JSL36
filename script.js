let body = document.body;
let preloader = document.querySelector('.loadingio-spinner-spinner-qgyvztg7tu');
const url = window.location.toString();
let rightNow = new Date;

const getName = (url) => {
  const urlSplit = url.split('=');
  let name = urlSplit[1];
  if (name === undefined) {
    name = 'SanSanKon';
  }
  return name;
};

const username = getName(url);

const getDate = new Promise((resolve, reject) => {setTimeout(() => rightNow ? resolve(rightNow) : reject('No such a date'), 2000);
});

const userInformation = fetch('https://api.github.com/users/' + username);

Promise.all([userInformation, getDate])
.then(([request, date]) => {
  requestInfo = request;
  requestDate = date;
})
.then(res => requestInfo.json())
.then(json => {
  let picture = json.avatar_url;
  let name = json.login;
  let bio = json.bio;
  let info = json.html_url;
  if (name) {
    createPicture = () => {
      let addPicture = document.createElement('img');
      addPicture.src = picture;
      document.body.appendChild(addPicture);
    }

  let createBio = () => {
        let addBio = document.createElement('h2');
        let addNoBio = document.createElement('h2');
        addBio.innerHTML = bio;
        addNoBio.innerHTML = 'Bio: пользователь данную информацию о себе не указал';
        if (bio) {
          document.body.appendChild(addBio);
        } else {
          document.body.appendChild(addNoBio);
      }
      }

      let createInfo = () => {
        let elementForLink = document.createElement('a');
        let elementForHeader = document.createElement('h2');
        elementForHeader.innerText = name;
        elementForLink.href = info;
        document.body.appendChild(elementForLink);
        elementForLink.appendChild(elementForHeader);
      }

      const createDate = () => {
        let rightNow = new Date();
        let addDate = document.createElement('h2');
        addDate.innerHTML = rightNow;
        if (rightNow) {
          document.body.appendChild(addDate);
        }
      }

      preloader.style.display = 'none';
      createPicture();
      createInfo();
      createBio();
      createDate();
    } else {
      alert('Информация о пользователе не доступна');
    }
  })
  .catch(err => alert(err + ' Информация о пользователе не доступна'));
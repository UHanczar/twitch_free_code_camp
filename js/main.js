

let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", 'dfdfsf121afasfa'];
let linkChannels = 'https://api.twitch.tv/kraken/channels/';
let linkStreams = 'https://api.twitch.tv/kraken/streams/';
let clientID = '47vnkwxfculaff9bjci6hb15u09ljb';
let container = document.getElementById('container');
let getAllChannelsButton = document.getElementById('all-streams');
let buttonStreams = document.getElementById('online-button');
let buttonOfflineChannels = document.getElementById('offline-channels');

// var url = 'https://api.twitch.tv/kraken/streams/' + channels[0] + '?client_id=' + clientID;
//
// function getLIk(data) {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.send(null);
//   xhr.onload = function () {
//     if(xhr.status === 200) {
//       let res = JSON.parse(this.responseText);
//       console.log(res);
//     }
//   }
// }

// getLIk(channels);


function getChannel(data) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', linkChannels + data + '?client_id=' + clientID, true);
  xhr.send(null);
  let res = data;
  xhr.onload = function () {
    if(xhr.status === 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);

      if(data.error) {
        console.log(data.message, res);
        let streamWrapper = document.createElement('div');
        streamWrapper.id = 'error';
        streamWrapper.classList.add('row', 'stream-wrapper', 'error-message');
        streamWrapper.style.backgroundColor = '#C9302C';
        streamWrapper.innerHTML = '<p>Channel ' + '<b>' + res + '</b>' +' does not exist. It either has never been existed or has been closed. Also check your chanell\'s spelling.</p>';
        container.appendChild(streamWrapper);
      } else {

        //if(data.stream === null) {

        // styles for every stream-wrapper
        let streamWrapper = document.createElement('div');
        streamWrapper.id = 'stream';
        streamWrapper.classList.add('row', 'stream-wrapper');
        streamWrapper.style.backgroundColor = '#d58512';

        // styles for img
        let imgContainer = document.createElement('div');
        imgContainer.classList.add('col-xs-2');
        let img = document.createElement('img');
        img.src = data.logo;
        img.classList.add('img-responsive', 'img-circle', 'img-logo');
        imgContainer.appendChild(img);
        streamWrapper.appendChild(imgContainer);


        // name of stream
        let linkStr = document.createElement('a');
        linkStr.classList.add('link-name', 'col-xs-2', 'text-center');
        linkStr.innerText = data.display_name;
        linkStr.setAttribute('href', data.url);
        linkStr.setAttribute('target', '_blank');
        streamWrapper.appendChild(linkStr);

        // stream status
        let currentStatus = document.createElement('p');
        currentStatus.classList.add('stream-status', 'col-xs-8', 'text-center');
        currentStatus.textContent = 'offline';
        streamWrapper.appendChild(currentStatus);

        container.appendChild(streamWrapper);
        //}
      }
    }
  };
}

function getStream(data) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', linkStreams + data + '?client_id=' + clientID, true);
  xhr.send(null);

  xhr.onload = function () {
    if(xhr.status === 200) {
      let data = JSON.parse(this.responseText);
      console.log(data);
      //if(data.stream !== null) {

      // styles for every stream-wrapper
      let streamWrapper = document.createElement('div');
      streamWrapper.id = 'stream';
      streamWrapper.classList.add('row', 'stream-wrapper');
      streamWrapper.style.backgroundColor = '#449D44';


      // styles for img
      let imgContainer = document.createElement('div');
      imgContainer.classList.add('col-xs-2');
      let img = document.createElement('img');
      img.src = data.stream.channel.logo;
      img.classList.add('img-responsive', 'img-circle', 'img-logo');
      imgContainer.appendChild(img);
      streamWrapper.appendChild(imgContainer);

      // name of stream
      let linkStr = document.createElement('a');
      linkStr.classList.add('link-name', 'col-xs-2', 'text-center');
      linkStr.innerText = data.stream.channel.display_name;
      linkStr.setAttribute('href', data.stream.channel.url);
      linkStr.setAttribute('target', '_blank');
      streamWrapper.appendChild(linkStr);

      // stream status
      let currentStatus = document.createElement('p');
      currentStatus.classList.add('stream-status', 'col-xs-8', 'text-center');
      currentStatus.textContent = data.stream.channel.status;
      streamWrapper.appendChild(currentStatus);

      container.appendChild(streamWrapper);
      //}
    }
  };
}

// loading all channels from array
function getChannelsOnLoad(data) {

  container.innerHTML = '';

  for(let i = 0; i < data.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', linkStreams + data[i] + '?client_id=' + clientID, true);
    xhr.send(null);
    let res = data[i];

    xhr.onload = function () {
      if(xhr.status === 200) {
        let data = JSON.parse(this.responseText);
        console.log(data);
        if(data.stream === null) {
          getChannel(res);
        } else if(data.stream !== null) {
          getStream(res);
        }
      }
    };
  }
}


function getStreams(data) {

  buttonStreams.addEventListener('click', function () {

    container.innerHTML = '';

    for(let i = 0; i < data.length; i++) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', linkStreams + data[i] + '?client_id=' + clientID, true);
      xhr.send(null);
      let res = data[i];
      xhr.onload = function () {
        if(xhr.status === 200) {
          let data = JSON.parse(this.responseText);
          console.log(data);
          if(data.stream !== null) {
            // styles for every stream-wrapper
            let streamWrapper = document.createElement('div');
            streamWrapper.id = 'stream';
            streamWrapper.classList.add('row', 'stream-wrapper');
            streamWrapper.style.backgroundColor = '#449D44';


            // styles for img
            let imgContainer = document.createElement('div');
            imgContainer.classList.add('col-xs-3');
            let img = document.createElement('img');
            img.src = data.stream.channel.logo;
            img.classList.add('img-responsive', 'img-circle', 'img-logo');
            imgContainer.appendChild(img);
            streamWrapper.appendChild(imgContainer);

            // name of stream
            let linkStr = document.createElement('a');
            linkStr.classList.add('link-name', 'col-xs-3', 'text-center');
            linkStr.innerText = data.stream.channel.display_name;
            linkStr.setAttribute('href', data.stream.channel.url);
            linkStr.setAttribute('target', '_blank');
            streamWrapper.appendChild(linkStr);

            // stream status
            let currentStatus = document.createElement('p');
            currentStatus.classList.add('stream-status', 'col-xs-6', 'text-center');
            currentStatus.textContent = data.stream.channel.status;
            streamWrapper.appendChild(currentStatus);

            container.appendChild(streamWrapper);
          }
        }
      };
    }
  });
}

function getOfflineChannels(data) {
  buttonOfflineChannels.addEventListener('click', function () {

    container.innerHTML = '';

    for(let i = 0; i < data.length; i++) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', linkStreams + data[i] + '?client_id=' + clientID, true);
      xhr.send(null);
      let res = data[i];

      xhr.onload = function () {
        if(xhr.status === 200) {
          let data = JSON.parse(this.responseText);
          console.log(data);
          if(data.stream === null) {
            getChannel(res);
          }
        }
      };
    }

  });
}

function getAllChannels() {
  getAllChannelsButton.addEventListener('click', function () {
    getChannelsOnLoad(channels);

  });
}


getChannelsOnLoad(channels);
getStreams(channels);
getOfflineChannels(channels);
getAllChannels(channels);

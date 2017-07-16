"use strict";

var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", 'dfdfsf121afasfa'];
var linkChannels = 'https://wind-bow.gomix.me/twitch-api/channels/';
var linkStreams = 'https://wind-bow.gomix.me/twitch-api/streams/';
var container = document.getElementById('container');
var getAllChannelsButton = document.getElementById('all-streams');
var buttonStreams = document.getElementById('online-button');
var buttonOfflineChannels = document.getElementById('offline-channels');

function getChannel(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', linkChannels + data, true);
  xhr.send(null);
  var res = data;
  xhr.onload = function () {
    if (xhr.status === 200) {
      var _data = JSON.parse(this.responseText);
      console.log(_data);

      if (_data.error) {
        console.log(_data.message, res);
        var streamWrapper = document.createElement('div');
        streamWrapper.id = 'error';
        streamWrapper.classList.add('row', 'stream-wrapper', 'error-message');
        streamWrapper.style.backgroundColor = '#C9302C';
        streamWrapper.innerHTML = '<p>Channel ' + '<b>' + res + '</b>' + ' does not exist. It either has never been existed or has been closed. Also check your chanell\'s spelling.</p>';
        container.appendChild(streamWrapper);
      } else {

        //if(data.stream === null) {

        // styles for every stream-wrapper
        var _streamWrapper = document.createElement('div');
        _streamWrapper.id = 'stream';
        _streamWrapper.classList.add('row', 'stream-wrapper');
        _streamWrapper.style.backgroundColor = '#d58512';

        // styles for img
        var imgContainer = document.createElement('div');
        imgContainer.classList.add('col-xs-2');
        var img = document.createElement('img');
        img.src = _data.logo;
        img.classList.add('img-responsive', 'img-circle', 'img-logo');
        imgContainer.appendChild(img);
        _streamWrapper.appendChild(imgContainer);

        // name of stream
        var linkStr = document.createElement('a');
        linkStr.classList.add('link-name', 'col-xs-2', 'text-center');
        linkStr.innerText = _data.display_name;
        linkStr.setAttribute('href', _data.url);
        linkStr.setAttribute('target', '_blank');
        _streamWrapper.appendChild(linkStr);

        // stream status
        var currentStatus = document.createElement('p');
        currentStatus.classList.add('stream-status', 'col-xs-8', 'text-center');
        currentStatus.textContent = 'offline';
        _streamWrapper.appendChild(currentStatus);

        container.appendChild(_streamWrapper);
        //}
      }
    }
  };
}

function getStream(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', linkStreams + data, true);
  xhr.send(null);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var _data2 = JSON.parse(this.responseText);
      console.log(_data2);
      //if(data.stream !== null) {

      // styles for every stream-wrapper
      var streamWrapper = document.createElement('div');
      streamWrapper.id = 'stream';
      streamWrapper.classList.add('row', 'stream-wrapper');
      streamWrapper.style.backgroundColor = '#449D44';

      // styles for img
      var imgContainer = document.createElement('div');
      imgContainer.classList.add('col-xs-2');
      var img = document.createElement('img');
      img.src = _data2.stream.channel.logo;
      img.classList.add('img-responsive', 'img-circle', 'img-logo');
      imgContainer.appendChild(img);
      streamWrapper.appendChild(imgContainer);

      // name of stream
      var linkStr = document.createElement('a');
      linkStr.classList.add('link-name', 'col-xs-2', 'text-center');
      linkStr.innerText = _data2.stream.channel.display_name;
      linkStr.setAttribute('href', _data2.stream.channel.url);
      linkStr.setAttribute('target', '_blank');
      streamWrapper.appendChild(linkStr);

      // stream status
      var currentStatus = document.createElement('p');
      currentStatus.classList.add('stream-status', 'col-xs-8', 'text-center');
      currentStatus.textContent = _data2.stream.channel.status;
      streamWrapper.appendChild(currentStatus);

      container.appendChild(streamWrapper);
      //}
    }
  };
}

// loading all channels from array
function getChannelsOnLoad(data) {

  container.innerHTML = '';

  var _loop = function _loop(i) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', linkStreams + data[i], true);
    xhr.send(null);
    var res = data[i];

    xhr.onload = function () {
      if (xhr.status === 200) {
        var _data3 = JSON.parse(this.responseText);
        console.log(_data3);
        if (_data3.stream === null) {
          getChannel(res);
        } else if (_data3.stream !== null) {
          getStream(res);
        }
      }
    };
  };

  for (var i = 0; i < data.length; i++) {
    _loop(i);
  }
}

function getStreams(data) {

  buttonStreams.addEventListener('click', function () {

    container.innerHTML = '';

    var _loop2 = function _loop2(i) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', linkStreams + data[i], true);
      xhr.send(null);
      var res = data[i];
      xhr.onload = function () {
        if (xhr.status === 200) {
          var _data4 = JSON.parse(this.responseText);
          console.log(_data4);
          if (_data4.stream !== null) {
            // styles for every stream-wrapper
            var streamWrapper = document.createElement('div');
            streamWrapper.id = 'stream';
            streamWrapper.classList.add('row', 'stream-wrapper');
            streamWrapper.style.backgroundColor = '#449D44';

            // styles for img
            var imgContainer = document.createElement('div');
            imgContainer.classList.add('col-xs-3');
            var img = document.createElement('img');
            img.src = _data4.stream.channel.logo;
            img.classList.add('img-responsive', 'img-circle', 'img-logo');
            imgContainer.appendChild(img);
            streamWrapper.appendChild(imgContainer);

            // name of stream
            var linkStr = document.createElement('a');
            linkStr.classList.add('link-name', 'col-xs-3', 'text-center');
            linkStr.innerText = _data4.stream.channel.display_name;
            linkStr.setAttribute('href', _data4.stream.channel.url);
            linkStr.setAttribute('target', '_blank');
            streamWrapper.appendChild(linkStr);

            // stream status
            var currentStatus = document.createElement('p');
            currentStatus.classList.add('stream-status', 'col-xs-6', 'text-center');
            currentStatus.textContent = _data4.stream.channel.status;
            streamWrapper.appendChild(currentStatus);

            container.appendChild(streamWrapper);
          }
        }
      };
    };

    for (var i = 0; i < data.length; i++) {
      _loop2(i);
    }
  });
}

function getOfflineChannels(data) {
  buttonOfflineChannels.addEventListener('click', function () {

    container.innerHTML = '';

    var _loop3 = function _loop3(i) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', linkStreams + data[i], true);
      xhr.send(null);
      var res = data[i];

      xhr.onload = function () {
        if (xhr.status === 200) {
          var _data5 = JSON.parse(this.responseText);
          console.log(_data5);
          if (_data5.stream === null) {
            getChannel(res);
          }
        }
      };
    };

    for (var i = 0; i < data.length; i++) {
      _loop3(i);
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

//# sourceMappingURL=main-compiled.js.map
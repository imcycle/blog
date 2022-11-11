

```js


    const fileReader = new FileReader();
fileReader.onload = function () {

}

fetch('https://oss-upload.qh5800.com/2022/10/21/1666317805557341067.amr')
.then(res => res.blob())
.then(blob => new File([blob], '123.mp3', { type: 'audio/mpeg' }))
```


```javascript
// https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia

// 想要获取一个最接近 1280x720 的相机分辨率
var constraints = { audio: true, video: { width: 1280, height: 720 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // 总是在最后检查错误
```











```ts
    <audio controls :src="baseUrl"></audio>
        <audio controls :src="mp3Url"></audio>
        <audio controls :src="amrUrl"></audio>
        <a-button @click="recordStart">录音</a-button>
        <a-button @click="recordStop">停止</a-button>
        <a-button @click="getSm">get</a-button>




         const stream = ref<MediaStream>();
  const recorder = ref<MediaRecorder>();
  const blobs = ref<Blob[]>([]);
  const baseUrl = ref('');
  const mp3Url = ref('');
  const amrUrl = ref('');
  const recordStart = () => {
    // 想要获取一个最接近 1280x720 的相机分辨率
    // const constraints = { audio: true, video: { width: 1280, height: 720 } };
    const constraints = { audio: true };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (mediaStream) {
        stream.value = mediaStream;

        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = (blob) => {
          blobs.value.push(blob.data);
        };
        mediaRecorder.onstop = () => {
          console.log(blobs);
          // baseUrl.value = URL.createObjectURL(new Blob(blobs.value, { type: 'audio/weba' }));
          // mp3Url.value = URL.createObjectURL(new Blob(blobs.value, { type: 'audio/mp3' }));
          // amrUrl.value = URL.createObjectURL(new Blob(blobs.value, { type: 'audio/amr' }));

          const a = document.createElement('a');

          // a.href = URL.createObjectURL(new Blob(blobs.value));
          // a.download = 'luyn.mp3';
          // a.click();

          a.href = URL.createObjectURL(new Blob(blobs.value, { type: 'audio/webm' }));
          a.download = 'luyn.weba';
          a.click();
        };
        mediaRecorder.start();

        recorder.value = mediaRecorder;
      })
      .catch(function (error) {
        console.log(`${error.name}: ${error.message}`);
      }); // 总是在最后检查错误
  };

  const getSm = () => {
    console.log('MediaStream.getTracks()', stream.value?.getTracks());
    console.log('MediaStream.getAudioTracks()', stream.value?.getAudioTracks());
  };

  const recordStop = () => {
    recorder.value?.stop();
    stream.value?.getTracks().forEach((track) => track.stop());
  };
```



常见 MIME 类型列表
https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types



https://github.com/xiangyuecn/Recorder
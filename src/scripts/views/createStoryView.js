export default class CreateStoryView {
  constructor() {
    this.webcam = null;
    this.marker = null;
  }

  render() {
    return `
      <section id="main-story-content" tabindex="-1" style="padding: 20px;">
        <h1>Tambah Cerita Baru</h1>
        <form id="create-story-form" enctype="multipart/form-data">
          <label>Deskripsi:<br />
            <textarea name="description" rows="4" required></textarea>
          </label><br /><br />

          <label>Ambil Foto dari Webcam:<br />
            <video id="webcam" autoplay playsinline width="320" height="240" style="border-radius: 8px;"></video><br />
            <button type="button" id="capture-btn">Ambil Foto</button><br />
            <canvas id="snapshot" width="320" height="240" style="display: none;"></canvas>
            <div id="preview-container"></div>
          </label><br /><br />

          <label>Pilih Lokasi pada Peta:</label><br />
          <div id="map" style="height: 300px; border-radius: 8px;"></div><br />
          <input type="hidden" name="lat" id="lat-input" />
          <input type="hidden" name="lon" id="lon-input" />

          <button type="submit">Kirim Cerita</button>
        </form>
        <div id="form-status" style="margin-top: 10px;"></div>
      </section>
    `;
  }

  async requestCameraAccess() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.setStream(stream);
      return stream;
    } catch (err) {
      throw err;
    }
  }

  initElements() {
    this.form = document.getElementById("create-story-form");
    this.statusDiv = document.getElementById("form-status");
    this.webcam = document.getElementById("webcam");
    this.captureBtn = document.getElementById("capture-btn");
    this.canvas = document.getElementById("snapshot");
    this.previewContainer = document.getElementById("preview-container");
    this.latInput = document.getElementById("lat-input");
    this.lonInput = document.getElementById("lon-input");
    this.mapContainer = document.getElementById("map");
  }

  showStatus(message) {
    this.statusDiv.innerText = message;
  }

  clear() {
    if (this.webcam?.srcObject) {
      this.webcam.srcObject.getTracks().forEach((track) => track.stop());
      this.webcam.srcObject = null;
    }
  }

  setStream(stream) {
    this.webcam.srcObject = stream;
  }

  onCapture(callback) {
    this.captureBtn.addEventListener("click", callback);
  }

  onSubmit(callback) {
    this.form.addEventListener("submit", callback);
  }

  getCanvasContext() {
    return this.canvas.getContext("2d");
  }

  getCanvas() {
    return this.canvas;
  }

  previewPhoto(file) {
    this.previewContainer.innerHTML = "";
    const previewImg = document.createElement("img");
    previewImg.src = URL.createObjectURL(file);
    previewImg.width = 160;
    previewImg.style.marginTop = "10px";
    this.previewContainer.appendChild(previewImg);
  }

  updatePhotoInput(file) {
    const oldInput = this.form.querySelector("#photo-input");
    if (oldInput) oldInput.remove();

    const hiddenFileInput = document.createElement("input");
    hiddenFileInput.type = "file";
    hiddenFileInput.name = "photo";
    hiddenFileInput.id = "photo-input";

    const dt = new DataTransfer();
    dt.items.add(file);
    hiddenFileInput.files = dt.files;

    hiddenFileInput.style.display = "none";
    this.form.appendChild(hiddenFileInput);
  }

  getFormData() {
    return new FormData(this.form);
  }

  setLocation(lat, lng, marker, map) {
    this.latInput.value = lat;
    this.lonInput.value = lng;

    if (marker) {
      marker.setLatLng([lat, lng]);
    } else {
      marker = L.marker([lat, lng]).addTo(map);
    }
    return marker;
  }
}

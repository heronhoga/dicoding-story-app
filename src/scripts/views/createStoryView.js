export default class CreateStoryView {
  constructor() {
    this.webcam = null;
    this.stream = null;
  }

  render() {
    return `
      <section style="padding: 20px;">
        <h2>Tambah Cerita Baru</h2>
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

  initElements() {
    this.form = document.getElementById("create-story-form");
    this.statusDiv = document.getElementById("form-status");
    this.webcam = document.getElementById("webcam");
    this.captureBtn = document.getElementById("capture-btn");
    this.canvas = document.getElementById("snapshot");
    this.previewContainer = document.getElementById("preview-container");
    this.latInput = document.getElementById("lat-input");
    this.lonInput = document.getElementById("lon-input");
    this.map = L.map("map").setView([-2.5, 118], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
  }

  showStatus(message) {
    this.statusDiv.innerText = message;
  }

  clear() {
    if (this.webcam && this.webcam.srcObject) {
      this.webcam.srcObject.getTracks().forEach(track => track.stop());
      this.webcam.srcObject = null;
    }
  }
}

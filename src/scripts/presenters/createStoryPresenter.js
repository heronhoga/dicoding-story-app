import { StoryModel } from "../models/storyModel";

export default class CreateStoryPresenter {
  constructor(view) {
    this.view = view;
    this.stream = null;
    this.marker = null;
  }

  async init() {
    this.view.initElements();

    this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.view.webcam.srcObject = this.stream;

    this.view.captureBtn.addEventListener("click", () => this.handleCapture());
    this.view.form.addEventListener("submit", (e) => this.handleSubmit(e));

    this.view.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.view.latInput.value = lat;
      this.view.lonInput.value = lng;

      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.view.map);
      }
    });
  }

  handleCapture() {
    const context = this.view.canvas.getContext("2d");
    context.drawImage(this.view.webcam, 0, 0, this.view.canvas.width, this.view.canvas.height);
    this.view.canvas.toBlob((blob) => {
      if (!blob || blob.size > 1024 * 1024) {
        alert("Gagal mengambil gambar atau ukuran melebihi 1MB!");
        return;
      }

      const file = new File([blob], "webcam-photo.jpg", { type: "image/jpeg" });
      const dt = new DataTransfer();
      dt.items.add(file);

      const oldInput = this.view.form.querySelector("#photo-input");
      if (oldInput) oldInput.remove();

      const hiddenFileInput = document.createElement("input");
      hiddenFileInput.type = "file";
      hiddenFileInput.name = "photo";
      hiddenFileInput.id = "photo-input";
      hiddenFileInput.files = dt.files;
      hiddenFileInput.style.display = "none";
      this.view.form.appendChild(hiddenFileInput);

      this.view.previewContainer.innerHTML = "";
      const previewImg = document.createElement("img");
      previewImg.src = URL.createObjectURL(file);
      previewImg.width = 160;
      previewImg.style.marginTop = "10px";
      this.view.previewContainer.appendChild(previewImg);
    }, "image/jpeg");
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.view.showStatus("Mengirim...");

    const formData = new FormData(this.view.form);
    const fileInput = this.view.form.querySelector('input[type="file"]');

    if (!fileInput || !fileInput.files[0] || fileInput.files[0].size > 1024 * 1024) {
      this.view.showStatus("Gambar tidak ditemukan atau terlalu besar (>1MB).");
      return;
    }

    this.view.clear();

    try {
      const response = await StoryModel.create(formData);
      if (response.ok) {
        this.view.showStatus("Cerita berhasil dikirim!");
        window.location.hash = "#/main";
      } else {
        this.view.showStatus(`Gagal mengirim cerita: ${response.message}`);
      }
    } catch (err) {
      console.error(err);
      this.view.showStatus("Terjadi kesalahan saat mengirim cerita.");
    }
  }
}

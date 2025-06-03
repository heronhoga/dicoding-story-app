export default class CreateStoryPresenter {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    this.marker = null;
    this.map = null;
  }

  async init() {
    try {
      await this.view.requestCameraAccess(); 
    } catch (err) {
      this.view.showStatus("Gagal mengakses kamera: " + err.message);
      console.error(err);
      return;
    }

    this.map = L.map(this.view.mapContainer).setView([-2.5, 118], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      this.marker = this.view.setLocation(lat, lng, this.marker, this.map);
    });

    this.view.onCapture(() => {
      const context = this.view.getCanvasContext();
      const canvas = this.view.getCanvas();
      context.drawImage(this.view.webcam, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
        this.view.previewPhoto(file);
        this.view.updatePhotoInput(file);
      }, "image/jpeg");
    });

    this.view.onSubmit(async (e) => {
      e.preventDefault();
      this.view.showStatus("Mengirim cerita...");

      try {
        const formData = this.view.getFormData();
        await this.model.createStory(formData);
        this.view.showAlert("Cerita berhasil dikirim!"); // ganti alert
        this.view.reloadPage(); // ganti window.location.reload()
      } catch (err) {
        this.view.showAlert("Gagal mengirim cerita."); // ganti alert
        console.error("Error saat kirim cerita:", err);
      }
    });
  }
}

import { createStory } from "../../data/api";
import { updateAuthNav } from "../../utils";

export default class CreatePage {
  async render() {
    updateAuthNav();
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

  async afterRender() {
    const webcam = document.getElementById("webcam");
    const canvas = document.getElementById("snapshot");
    const captureBtn = document.getElementById("capture-btn");
    const form = document.getElementById("create-story-form");
    const statusDiv = document.getElementById("form-status");
    const previewContainer = document.getElementById("preview-container");

    this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
    webcam.srcObject = this.stream;

    captureBtn.addEventListener("click", () => {
      const context = canvas.getContext("2d");
      context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (!blob || blob.size > 1024 * 1024) {
          alert("Gagal mengambil gambar atau ukuran melebihi 1MB!");
          return;
        }

        const file = new File([blob], "webcam-photo.jpg", {
          type: "image/jpeg",
        });
        const dt = new DataTransfer();
        dt.items.add(file);

        const oldInput = form.querySelector("#photo-input");
        if (oldInput) oldInput.remove();

        const hiddenFileInput = document.createElement("input");
        hiddenFileInput.type = "file";
        hiddenFileInput.name = "photo";
        hiddenFileInput.id = "photo-input";
        hiddenFileInput.files = dt.files;
        hiddenFileInput.style.display = "none";

        form.appendChild(hiddenFileInput);

        previewContainer.innerHTML = "";
        const previewImg = document.createElement("img");
        previewImg.src = URL.createObjectURL(file);
        previewImg.width = 160;
        previewImg.style.marginTop = "10px";
        previewContainer.appendChild(previewImg);
      }, "image/jpeg");
    });

    // OpenStreetMap setup
    const map = L.map("map").setView([-2.5, 118], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const latInput = document.getElementById("lat-input");
    const lonInput = document.getElementById("lon-input");
    let marker;

    map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      latInput.value = lat;
      lonInput.value = lng;

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map);
      }
    });

    // Form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusDiv.innerText = "Mengirim...";

      const formData = new FormData(form);

      const fileInput = form.querySelector('input[type="file"]');
      if (
        !fileInput ||
        !fileInput.files[0] ||
        fileInput.files[0].size > 1024 * 1024
      ) {
        statusDiv.innerText =
          "Gambar tidak ditemukan atau terlalu besar (>1MB).";
        return;
      }

      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        webcam.srcObject = null;
      }

      try {
        const response = await createStory(formData);
        if (response.ok) {
          statusDiv.innerText = "Cerita berhasil dikirim!";
          window.location.hash = "#/main";
        } else {
          statusDiv.innerText = `Gagal mengirim cerita: ${response.message}`;
        }
      } catch (error) {
        statusDiv.innerText = "Terjadi kesalahan saat mengirim cerita.";
        console.error(error);
      }
    });
  }

  destroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      const webcam = document.getElementById("webcam");
      if (webcam) webcam.srcObject = null;
    }
  }
}

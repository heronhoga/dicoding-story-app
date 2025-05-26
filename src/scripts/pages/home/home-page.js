export default class HomePage {
  async render() {
    return `
<section style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(to bottom right, #e0f7fa, #80deea);">
  <div style="background-color: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);  max-width: 600px;">
    <h1 style="color: #00796b; margin-bottom: 20px;">MyStory!</h1>
    <p style="color: #444; font-size: 1.1em; line-height: 1.6;">
      MyStory adalah aplikasi sederhana yang dirancang untuk membantu pengguna mencatat dan menyimpan momen penting dalam hidup mereka. Aplikasi ini memungkinkan pengguna untuk membuat data catatan baru dengan mudah, sehingga setiap cerita atau pengalaman pribadi dapat terdokumentasi dengan baik. Dengan antarmuka yang bersih dan intuitif, MyStory fokus pada fungsi utamanya: menulis dan menyimpan catatan tanpa distraksi.
    </p>
  </div>
</section>

    `;
  }

  async afterRender() {
    // Do your job here
  }
}

# **Markupless Framework** 🚀✨  

![Markupless Version](https://img.shields.io/badge/Version-1.0.0-blue)  
![License](https://img.shields.io/badge/License-MIT-green)  
![TypeScript](https://img.shields.io/badge/Built%20With-TypeScript-blue)  
![Maintainability](https://img.shields.io/badge/Maintainability-A%2B-brightgreen)  
![Downloads](https://img.shields.io/badge/Downloads-10k%2B-orange)  

Markupless adalah **JavaScript Framework** modern yang menawarkan pendekatan **tanpa markup** untuk membangun aplikasi berbasis web yang **readable**, **intuitif**, dan **minim boilerplate**! 🚀 Dibuat untuk pengembang yang ingin fokus pada **logic dan hasil akhir**, Markupless memungkinkan Anda membuat aplikasi yang **clean**, **magically working**, dan **powerful**.  

## **🔥 Fitur Utama**  

- **Fluent API**: Setiap method terasa seperti kalimat natural! 🧠  
- **Reactive State Management**: Kelola state dengan mudah dan otomatis update UI. 🌟  
- **Lifecycle Hooks**: Jalankan fungsi sebelum dan sesudah render. ⏳  
- **Plugin System**: Tambahkan ekstensi dan fitur tanpa ribet. 🔌  
- **Declarative UI**: Bangun UI tanpa harus menyentuh HTML atau DOM. 🛠️  
- **Dynamic Routing**: Routing yang fleksibel dan gampang diatur. 🗺️  
- **Global Theming**: Ubah tema aplikasi dengan sekali konfigurasi. 🎨  
- **TypeScript Support**: Dengan type safety untuk mencegah error. ✅  

---

## **🚀 Cara Install**  

Install dengan npm:  
```bash
npm install markupless
```

---

## **📖 Contoh Penggunaan**  

Buat aplikasi **"Hello World"** dalam hitungan detik:  
```typescript
import { app, section, h1 } from "markupless";

app()
  .config({ title: "Hello Markupless!" })
  .add(
    section().with(
      h1("Hello, World!").style({
        color: "#007BFF",
        textAlign: "center",
      })
    )
  )
  .render();
```

---

## **✨ Contoh Fitur**  

### **To-Do List App**  
```typescript
app()
  .state({ tasks: [], newTask: "" })
  .logic((state, actions) => ({
    addTask: () => {
      if (state.newTask) state.tasks.push(state.newTask);
      state.newTask = "";
    },
  }))
  .add(
    section()
      .with(input().onInput((value, actions) => (state.newTask = value)))
      .with(button("Add").onClick((actions) => actions.addTask()))
  )
  .add(
    ul().each((state) => state.tasks, (task) =>
      li().with(task).style({ color: "#333" })
    )
  )
  .render();
```

---

## **🛠️ Fitur Tambahan**  

- 🔌 **Plugin Support**: Tambahkan fitur seperti router atau state plugin.  
- 🎨 **Customizable Themes**: Buat tema global dengan mudah.  
- 🧩 **Declarative Components**: Fokus pada desain tanpa pusing DOM.  

---

## **📚 Dokumentasi**  

Lihat dokumentasi lengkap di [Markupless Docs](https://markupless.dev).  

---

## **💬 Komunitas & Dukungan**  

Bergabung dengan komunitas kami untuk diskusi, tips, atau bantuan:  
- 🌐 Website: [markupless.dev](https://markupless.dev)  
- 🐦 Twitter: [@markupless_js](https://twitter.com/markupless_js)  
- 💬 Discord: [Markupless Community](https://discord.gg/markupless)  

---

## **📄 Lisensi**  

Markupless dirilis di bawah lisensi **MIT**. Anda bebas menggunakannya untuk proyek apapun! ✌️  

**Selamat coding dengan Markupless!** 🚀

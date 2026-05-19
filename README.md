# 🏡 DaftAlerts UI 🚀

[![Build and Test](https://github.com/guibranco/daftalerts-ui/actions/workflows/build.yml/badge.svg)](https://github.com/guibranco/daftalerts-ui/actions/workflows/build.yml)
[![Deploy GH Pages](https://github.com/guibranco/daftalerts-ui/actions/workflows/deploy.yml/badge.svg)](https://github.com/guibranco/daftalerts-ui/actions/workflows/deploy.yml)

**Your Daft.ie inbox, organized and supercharged.** 🇮🇪

DaftAlerts UI provides a modern, fast, and highly customizable interface for managing your property search in Ireland. Stop scrolling through endless lists and start organizing your future home search with precision.

---

## ✨ Key Features

- 📥 **Organized Inbox**: Easily manage new property listings.
- ✅ **Approval Workflow**: Move properties you love to the "Approved" list.
- ♻️ **Recycle Bin**: Keep your workspace clean by moving unwanted listings to the recycled section.
- 📍 **Interactive Map**: View all your properties on a beautiful map integration.
- 🔍 **Advanced Filtering**:
  - Filter by Dublin Eircode Routing Keys (D01, D02, etc.).
  - Price range slider with custom limits.
  - Bed & Bath counts.
  - Property type and BER rating.
- 🌓 **Dark & Light Mode**: Choose the theme that suits your eyes.
- 🌍 **Multilingual support**: Fully localized for multiple languages.
- ⌨️ **Power User Shortcuts**: Efficient keyboard navigation for fast triage.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **Maps**: [Google Maps Platform](https://developers.google.com/maps)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **I18n**: [react-i18next](https://react.i18next.com/)

---

## 🚀 Getting Started

### 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/guilherme-stracini/daftalerts-ui.git
   cd daftalerts-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### 💻 Local Development

Run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

We use [Vitest](https://vitest.dev/) for our unit and component tests.

- **Run tests once**:
  ```bash
  npm run test
  ```
- **Run tests in watch mode**:
  ```bash
  npm run test:watch
  ```
- **Generate coverage report**:
  ```bash
  npm run test:coverage
  ```

---

## 🏗️ Building for Production

Compile the project and bundle it for production:

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## 🚢 Deployment

The project is configured for automatic deployment to **GitHub Pages** via GitHub Actions.

- **URL**: [http://guilherme.stracini.com.br/daftalerts-ui/](http://guilherme.stracini.com.br/daftalerts-ui/)
- **Environment**: Managed through `.github/workflows/deploy.yml`.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ for the Dublin house hunting community. 🇮🇪🏠

@import 'leaflet/dist/leaflet.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(34, 211, 238, 0.18), transparent 24%),
    radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.16), transparent 35%),
    linear-gradient(135deg, #020817 0%, #0f172a 30%, #111827 100%);
  color: #e2e8f0;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

button {
  transition: all 0.2s ease;
}

.leaflet-container {
  width: 100%;
  height: 100%;
  background: #0f172a;
}

.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  background: rgba(15, 23, 42, 0.97);
  color: #e2e8f0;
}

.leaflet-control-zoom {
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  overflow: hidden;
  border-radius: 12px !important;
}

.leaflet-control-zoom a {
  color: #e2e8f0 !important;
  background: rgba(15, 23, 42, 0.9) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
}

.leaflet-control-attribution {
  background: rgba(15, 23, 42, 0.78) !important;
  color: #cbd5e1 !important;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.8);
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.45);
  border-radius: 999px;
}

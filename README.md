# raffaella-cumple-6

La invitación se encuentra en `web/`. Ver `web/README.md` para desarrollo y validación.

## GitHub Pages

En GitHub, selecciona **Settings → Pages → Source → GitHub Actions**.
El workflow `.github/workflows/pages.yml` compila y publica al subir cambios a `main`.
También puedes iniciarlo desde **Actions → Publish invitation to GitHub Pages → Run workflow**.

URL del repositorio actual: https://celebra-click-ya.github.io/raffaella-cumple-6/

Para compilar localmente desde `web/`: `npm ci` y `npm run build:pages -- --base /raffaella-cumple-6/`.
El resultado estático está en `web/dist-pages/`; contiene `index.html`, JavaScript, CSS, imágenes y música.
`npm run dev:pages` permite trabajar sin servidor Cloudflare.

Se conserva la estética y los recursos de la invitación original de Canva, con diseño adaptable, enlaces a ubicación y confirmación, cuenta regresiva corregida y música con intento de autoplay y alternativa mediante toque en la portada.

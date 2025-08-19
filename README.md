# 🍽️ Hama — Pedidos de Comida Árabe

![Expo](https://img.shields.io/badge/Expo-53.0.17-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.79.5-61dafb?logo=react)
![Expo%20Router](https://img.shields.io/badge/Expo%20Router-5.1.3-1B1F23)
![Supabase](https://img.shields.io/badge/Supabase-%5E2.52.1-3ECF8E?logo=supabase)
![Yup](https://img.shields.io/badge/Yup-1.6.1-2C3E50)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📱 Descripción

**Hama** es una app móvil para que tus clientes **exploren el menú, seleccionen cantidades y realicen pedidos en minutos**, con una experiencia moderna y clara. Pensada para digitalizar el flujo actual (llamadas/whatsapp + cuaderno), **controla stock en tiempo real**, informa si la **cocina está abierta/cerrada** y simplifica la gestión del negocio.

---

## ✨ Funcionalidades principales

**Para usuarios**

- 📋 Menú con imagen, descripción y precio de cada plato.
- ➕ Selección de cantidad con **control de stock** y advertencias de máximo disponible.
- 🛒 Carrito con subtotales y total en tiempo real.
- 📍 **Dirección automática** vía geolocalización (editable).
- 🔔 Seguimiento del Estado del pedido (solicitado/recibido/enviado).
- 📞 Posibilidad de envío del último pedido por WhatsApp.
- 🗂 Visualización de **último pedido** y **Historial de pedidos**.
- 👤 Perfil con datos personales editables.

**Para administrador**

- 🟢 **Abrir / cerrar cocina** para habilitar/bloquear pedidos.
- 📦 Actualización de **stock** de platos.
- 📋 Listado de **pedidos solicitados** (con datos del cliente, total y detalle).
- 🚚 Listado de **pedidos enviados**.
- 🔄 Cambio de estado de los pedidos.

> La app utiliza **Supabase** para persistencia, y **AsyncStorage** para conservar datos relevantes en el dispositivo (último pedido, historial, perfil del usuario).

---

## 🚀 Demo visual (galería tipo carrusel)

> ### **_Acceso Usuarios_**

### Inicio y acceso

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/01%20-%20inicio%20sin%20logueo.png" width="240" />
  <img src="assets/screens/02%20-%20form%20registro.png" width="240" />
  <img src="assets/screens/03%20-%20form%20login.png" width="240" />
  <img src="assets/screens/04%20-%20inicio%20logueado.png" width="240" />
</div>

### Menú y selección

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/05%20-%20lista%20platos.png" width="240" />
  <img src="assets/screens/06%20-%20seleccion%20plato.png" width="240" />
  <img src="assets/screens/07%20-%20advertencia%20stock%20maximo.png" width="240" />
  <img src="assets/screens/08%20-%20lista%20platos%20con%20pedido.png" width="240" />
</div>

### Carrito y confirmación

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/09%20-%20carrito%20pedido.png" width="240" />
  <img src="assets/screens/10%20-%20confirmar%20pedido.png" width="240" />
  <img src="assets/screens/11%20-%20envio%20pedido.png" width="240" />
  <img src="assets/screens/12%20-%20pedido%20enviado.png" width="240" />
  <img src="assets/screens/13%20-%20carrito%20vacio.png" width="240" />
</div>

### Perfil del usuario

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/14%20-%20mas%20opciones%20principal.png" width="240" />
    <img src="assets/screens/14.1%20-%20perfil%20usuario%20principal.png" width="240" />
  <img src="assets/screens/15%20-%20perfil%20usuario%20datos%20personales.png" width="240" />
  <img src="assets/screens/15.1%20-%20perfil%20usuario%20cambio%20contrasena.png" width="240" />
  <img src="assets/screens/15.2%20-%20perfil%20usuario%20eliminar%20cuenta.png" width="240" />
</div>

### Otras Opciones

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/16%20-%20perfil%20usuario%20ultimo%20pedido.png" width="240" />
  <img src="assets/screens/17%20-%20perfil%20usuario%20historial%20pedidos.png" width="240" />
  <img src="assets/screens/18%20-%20perfil%20usuario%20detalle%20historial%20pedido.png" width="240" />
   <img src="assets/screens/19%20-%20perfil%20usuario%20cierre%20sesion.png" width="240" />
</div>

> ### **_Acceso Administrador_**

### Inicio y acceso

<div style="display:flex; gap:10px; overflow-x:auto;">
  <img src="assets/screens/20%20-%20perfil%20admin%20principal.png" width="240" />
<img src="assets/screens/21%20-%20perfil%20admin%20cambio%20estado%20cocina.png" width="240" />
<img src="assets/screens/22%20-%20perfil%20admin%20actualiza%20stock%20lista.png" width="240" />
<img src="assets/screens/23%20-%20perfil%20admin%20actualiza%20stock%20plato.png" width="240" />
<img src="assets/screens/24%20-%20perfil%20admin%20pedidos%20solicitados%20lista.png" width="240" />
<img src="assets/screens/25%20-%20perfil%20admin%20pedidos%20solicitados%20detalle.png" width="240" />
<img src="assets/screens/26%20-%20perfil%20admin%20pedidos%20recibidos%20lista.png" width="240" />
<img src="assets/screens/27%20-%20perfil%20admin%20pedidos%20recibidos%20detalle.png" width="240" />
<img src="assets/screens/28%20-%20perfil%20admin%20cierre%20sesion.png" width="240" />

</div>

---

## 🧰 Tecnologías

- **Expo (React Native)** `~53.0.17`
- **React Native** `0.79.5` + **Expo Router** `~5.1.3`
- **Supabase JS** `^2.52.1`
- **Expo Location** • **Expo Notifications** • **AsyncStorage**
- **React Hook Form** `^7.60` + **Yup** `^1.6.1`
- **React Navigation** (tabs/stack) + animaciones suaves

---

## 🛠 Instalación y uso

### Requisitos

- Node.js 18+
- npm o yarn
- Android Studio / Xcode (para emuladores)

### 1) Clonar e instalar

```bash
git clone https://github.com/tu-org/hama.git
cd hama
npm install
```

### 2) Variables de entorno

Renombrá `.env.example` a `.env` y completá:

```env
EXPO_PUBLIC_SUPABASE_URL="https://your-supabase-url.supabase.co"
EXPO_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 3) Correr la app

```bash
# Dev server
npm run start

# Android / iOS / Web
npm run android
npm run ios
npm run web
```

---

## 🗺️ Roadmap (próximos pasos)

- 🔐 Cambiar / recuperar contraseña (fix de sesión post cambio).
- 🔔 Notificaciones push al cambiar estado del pedido.
- 🔁 Repetir pedido desde historial.
- 🔑 Login con Google.
- 🧾 Funcionalidades Panel Admin
  - Filtros en listados de pedidos (fecha/estado/nombre/teléfono).
  - Edición de platos.
  - Mensajes por WhatsApp a clientes.

---

## 📄 Licencia

MIT

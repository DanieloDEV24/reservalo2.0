# Reservalo

> Reserva tu espacio, disfruta el deporte — instalaciones municipales a tu alcance.

**Reservalo** es una plataforma web de **reservas y gestión de instalaciones y actividades municipales**. Permite a los ciudadanos reservar pistas deportivas, espacios y actividades (como excursiones) en pocos clics, con disponibilidad en tiempo real, y da al ayuntamiento un panel completo para gestionarlo todo.

🛒 **Producto en venta** · Incluye código fuente completo y **manual de uso**.




![Mockup](./images/mockup.png)
<!-- Sustituye por una captura de la web -->

---

## ✨ Secciones

### 👤 Zona pública y cliente

| Sección | Descripción |
|---|---|
| **Home** | Hero con búsqueda filtrada o botón de acceso a instalaciones, explicación de lo que ofrece la web, cómo se usa y carrusel de instalaciones |
| **Instalaciones** | Listado completo con filtros; desde cada instalación se puede realizar la reserva |
| **Login / Logout** | Registro, inicio de sesión y recuperación de contraseña |
| **Mi información** | El cliente consulta sus datos personales |
| **Mis reservas** | Historial de reservas de instalaciones y actividades, con opción de anularlas |

### 🛠️ Zona de gestión (rol gestor)

| Sección | Descripción |
|---|---|
| **Gestor de instalaciones** | Crear, editar, dar de alta/baja, generar horario y borrar instalaciones |
| **Gestor de categorías** | Crear, editar y borrar las categorías que se asignan a las instalaciones |
| **Gestor de actividades** | Crear, editar, dar de alta/baja y borrar actividades municipales (excursiones...) con sus categorías |
| **Gestor de usuarios** | Crear, editar, dar de alta/baja, ver información y borrar usuarios |
| **Gestor de reservas** | Reservas del día, con check-in y anulación |
| **Estadísticas** | Dashboard con reservas por instalación, por categoría, últimas reservas... |

## 📧 Notificaciones por email

Cada acción (reserva, anulación...) envía un email con un **PDF** del justificante, tanto al **usuario** como al **gestor**, mediante [Resend](https://resend.com).

## ⚙️ Tecnologías

<p align="center">
  <img src="https://cdn.simpleicons.org/php/32cccc" height="44" alt="PHP" />&nbsp;
  <img src="https://cdn.simpleicons.org/codeigniter/32cccc" height="44" alt="CodeIgniter 4" />&nbsp;
  <img src="https://cdn.simpleicons.org/mysql/32cccc" height="44" alt="MySQL" />&nbsp;
  <img src="https://cdn.simpleicons.org/html5/32cccc" height="44" alt="HTML5" />&nbsp;
  <img src="https://cdn.simpleicons.org/css/32cccc" height="44" alt="CSS3" />&nbsp;
  <img src="https://cdn.simpleicons.org/javascript/32cccc" height="44" alt="JavaScript" />&nbsp;
  <img src="https://cdn.simpleicons.org/jquery/32cccc" height="44" alt="jQuery" />&nbsp;
  <img src="https://cdn.simpleicons.org/bootstrap/32cccc" height="44" alt="Bootstrap" />&nbsp;
  <img src="https://cdn.simpleicons.org/xampp/32cccc" height="44" alt="XAMPP" />&nbsp;
  <img src="https://cdn.simpleicons.org/resend/32cccc" height="44" alt="Resend" />
</p>

<p align="center">
  <sub>
    <b>Backend:</b> PHP · CodeIgniter 4 · MySQL &nbsp;|&nbsp;
    <b>Frontend:</b> HTML5 · CSS3 · JavaScript · jQuery · Bootstrap &nbsp;|&nbsp;
    <b>Emails:</b> Resend &nbsp;|&nbsp;
    <b>Entorno:</b> XAMPP
  </sub>
</p>

## 📦 Requisitos

- [XAMPP](https://www.apachefriends.org/) (Apache + MySQL) con **PHP 8.1 o superior**
- [Composer](https://getcomposer.org/)
- Cuenta de [Resend](https://resend.com) con API key

## 🚀 Instalación

```bash
# 1. Copia el proyecto en la carpeta htdocs de XAMPP
cd C:/xampp/htdocs
git clone https://github.com/DanieloDEV24/NOMBRE-DEL-REPO.git reservalo

# 2. Instala las dependencias
cd reservalo
composer install

# 3. Crea tu archivo de entorno
cp env .env
```

1. Arranca **Apache** y **MySQL** desde el panel de XAMPP.
2. Crea una base de datos en phpMyAdmin e **importa** el archivo SQL del proyecto (`database/reservalo.sql`).
3. Edita `.env`:

```ini
CI_ENVIRONMENT = development
app.baseURL = 'http://localhost/reservalo/public/'

database.default.hostname = localhost
database.default.database = NOMBRE_BD
database.default.username = root
database.default.password =

RESEND_API_KEY = tu_api_key
```
<!-- Ajusta nombres de archivos y variables a los reales del proyecto -->

La app estará disponible en `http://localhost/reservalo/public/`.

## 👥 Roles

| Rol | Acceso |
|---|---|
| **Cliente** | Home, instalaciones, reservas, mi información y mis reservas |
| **Gestor** | Todo lo anterior + gestores (instalaciones, categorías, actividades, usuarios, reservas) y estadísticas |

## 📖 Documentación

El proyecto incluye un **manual de uso** con la explicación detallada de cada módulo: `docs/manual.pdf`.

## 💼 Licencia y venta

Software comercial. Para adquirir Reservalo, solicitar una demo o pedir personalización, contacta con el autor.

## 👤 Autor

**Daniel Ruiz Soto**

- GitHub: [@DanieloDEV24](https://github.com/DanieloDEV24)
- Email: danielruizdeveloper@gmail.com
- Instagram: [danielo.dev](https://www.instagram.com/danielo.dev24/?hl=es)
- LinkedIn: [Daniel Ruiz Soto](https://www.linkedin.com/in/daniel-ruiz-soto-831885315/)

## 📄 Licencia

Distribuido bajo licencia MIT. Consulta el archivo `LICENSE` para más información.

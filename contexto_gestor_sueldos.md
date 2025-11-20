# Gestor de Sueldos – Cooperativa 25 de Mayo Ltda.
## Documento de Contexto para Cursor (Landing Page)

Este archivo define el contexto REAL del proyecto para que la landing page pueda generarse con información exacta, verificada y consistente con el software desarrollado.

---

## 1. Objetivo del Proyecto
El objetivo principal del sistema es **gestionar empleados, convenios laborales y liquidar sueldos** para la Cooperativa de Servicios Públicos 25 de Mayo Ltda.

El sistema permite:
- Registrar, editar y administrar empleados.
- Administrar convenios y categorías salariales.
- Realizar liquidaciones de sueldo de manera automática.
- Calcular aportes, descuentos y conceptos según convenio.
- Generar información organizada y útil para la administración y contaduría.

Este proyecto se desarrolla como trabajo académico de la **Tecnicatura Universitaria en Programación (UTN)** y, a la vez, como solución real para la cooperativa.

---

## 2. Tecnologías Utilizadas

### **Frontend**
- React  
- TypeScript  
- React-Bootstrap  
- TanStack React Table  
- TanStack React Virtual  
- Hooks personalizados  
- CSS moderno  
- Arquitectura modular y componentes funcionales  

### **Backend**
- Java  
- Spring + JPA/Hibernate  
- Endpoints REST  
- Manejo de roles y permisos  
- Validaciones del lado del backend  

### **Base de Datos**
- PostgreSQL  
- Tablas para empleados, convenios, categorías, liquidaciones, recibos y movimientos.

---

## 3. Usuarios del Sistema
El sistema está diseñado para personal interno de la cooperativa:

- Administración  
- Contaduría  
- Responsables de liquidación  

No es un sistema público.

---

## 4. Funcionalidades Principales del FRONTEND

### **Gestión de Empleados**
- Alta, baja y modificación de empleados.
- Tabla dinámica con:
  - Paginación
  - Filtrado
  - Ordenamiento
  - Virtualización
- Validaciones visuales.
- Interfaz limpia y profesional.

### **Gestión de Convenios**
- ABM de convenios.
- ABM de categorías asociadas.
- Definición de reglas salariales.
- Tablas con filtros y detalles.

### **Liquidación de Sueldos**
- Cálculo automático según convenio y categoría.
- Carga de conceptos remunerativos y no remunerativos.
- Cálculo de aportes, descuentos, retenciones, neto a cobrar.
- Posibilidad de generar un recibo y persistir la liquidación.
- Interfaz clara para revisar conceptos y totales.

---

## 5. Arquitectura General

El sistema se organiza así:

[ FRONTEND - React + TypeScript ]
|
| JSON / API REST
v
[ BACKEND - Java (Spring + JPA) ]
|
| SQL (ORM)
v
[ BASE DE DATOS - PostgreSQL ]


- El frontend consume endpoints REST del backend.
- El backend gestiona lógica de negocio y seguridad.
- La base de datos almacena toda la información.

---

## 6. Objetivo de la Landing Page

La landing page debe servir como **presentación ejecutable** para la materia Metodología en Sistemas II.

Debe incluir:
1. Resumen completo del proyecto.
2. Arquitectura y tecnologías utilizadas.
3. Secciones principales del sistema:
   - Empleados
   - Convenios
   - Liquidación
4. Botones para redireccionar o mostrar demos.
5. Estilo moderno, limpio y profesional.
6. Debe estar hecha en **HTML + CSS + JS (Vanilla)**.
7. Debe poder ser subida por **FileZilla** al servidor del profesor.

---

## 7. Autores del Proyecto
- **Francisco Giménez**  
- **Bruno Collaud**  
- **Guillermo Faes**

---

## 8. Nota para Cursor
Este archivo debe ser leído completamente y usado como **única fuente de verdad** para generar la landing.

No debe inventarse contenido que no esté aquí.  
No debe modificarse información clave.  
No debe afectar el proyecto original.

Fin del documento.

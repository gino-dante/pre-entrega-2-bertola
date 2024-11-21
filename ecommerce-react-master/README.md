# 🚴 Bike Store | Tienda de ciclismo

## 📝 Detalle
Ecommerce realizado en React conectado a una DB en Firebase/Firestore. La tienda está dedicada a la venta de bicicletas, donde podés ver en la home el listado de las mismas, entrar a su detalle, filtrar por categoría y agregar al carrito (con control de no sobrepasar el stock). En el carrito se puede modificar la cantidad de productos, eliminarlos y finalizar la compra (Al finalizar se despliega un modal con un formulario para completar los datos del usuario), se genera una orden con un ID único. Se controla en Firebase que se haya generado dicha orden.

## Funcionamiento:

### Pantalla principal con items y filtrado por categoría:

![uno](https://user-images.githubusercontent.com/90353038/176954348-01e48f1f-83b6-4e58-b867-2f959198cafe.gif)
<br><br><br>
### Acceso al detalle del producto, validación para selección de talle y stock. Por último agregamos al carrito:

![dos](https://user-images.githubusercontent.com/90353038/176954402-8a3b3650-e498-4a15-85c4-92130fa87332.gif)
<br><br><br>
### Lógica para actualizar cantidad si ya teníamos cargado de ese producto, condicional para nunca superar el stock. También borramos productos:

![tres](https://user-images.githubusercontent.com/90353038/176954419-94a8d7ef-70f4-42e5-901b-6d7c881d7e26.gif)
<br><br><br>
### Finalización de compra, con despliege modal con formulario. Luego se le informa al usuario el ID y controlamos en Firebase que se haya generado la orden:

![cuatro](https://user-images.githubusercontent.com/90353038/176954429-00eb74fd-fcb5-4adb-b6f6-baadaab93718.gif)

## 🚀 Tecnologías utilizadas
- Material UI
- React Bootstrap
- React Router Dom
- Sweetalert2
- Firebase/Firestore para la DB

<br>

## 🙋‍♂️ Hola, Soy Federico Krenn
:nerd_face: Desarrollador web Fullstack
<br>
👨‍🎓 Realizando la Tecnicatura en Desarrollo Web en ISPC y Tecnicatura en Software Libre en la UNL
<br>
📫 Conectemos en Linkedin: https://www.linkedin.com/in/fkrenn/


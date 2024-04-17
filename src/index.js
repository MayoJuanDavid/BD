//Estas obteniendo express desde el package json
//el paquete json son todas las  instalaciones que uno hace en un proyecto
const express = require("express");
const morgan = require("morgan");
const taskRoutes = require("./routes/tasks.routes");

const app = express();

app.use(morgan("dev"));
app.use(taskRoutes);

app.listen(3000);

console.log("mamalo mmgv mamalo");

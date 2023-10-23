import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencia al modelo de usuario
    required: true,
  },
  title: {
    type: String,
    required: true,
    // Expresión regular para validar el título de la tarea (cualquier caracter alfanumérico)
    match: /^[a-zA-Z0-9\s]*$/,
  },
  description: {
    type: String,
    required: false,
  },
},
{
  timestamps: true,
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;

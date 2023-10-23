import { models, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [3, "username must be at least 3 characters"],
      maxLength: [20, "username must be at most 20 characters"],
      unique: true,
      // Expresión regular para validar el nombre de usuario (solo letras, números y guiones bajos)
      match: /^[a-zA-Z0-9_]*$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Expresión regular para validar el formato del correo electrónico
      match: [/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", userSchema);

export default User;

import { abrirModalRemove } from "./activities.js";
import { abrirModalShow } from "./activities.js";
//import { abrirModalShow } from "./charlotte.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  abrirModalShow(".fa-dot-circle", ".close", "#modal-container", ".modal");
  abrirModalRemove(".remove", ".close-d", "#modal-container-d", ".modal-d");
});

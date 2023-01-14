import {
  getCourseData,
  /*   ModalRemoveCourses, */
  ShowCourses,
  openFormCourses,
  addCourse,
  closeWindowModal,
  editCourse,
} from "./news.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  getCourseData();
});

ShowCourses(
  ".fa-dot-circle",
  ".close-news",
  "#modal-container-news",
  ".modal-course"
);
/* ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc"); */
openFormCourses(".btn-news", ".cancel-form");
addCourse();
closeWindowModal(".poi", "#modal-container-news", ".modal-news", "modal-cl");
editCourse();

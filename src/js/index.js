import {
  ModalRemoveActivities,
  ModalShowActivities,
  /*   escrollBehavor, */
  openFormActivities,
  /*  getAllActivities,
  ph, */
  /*  insertActivities, */
  /*   tiempo_carga, */
  activitiesp,
} from "./activities.js";
/* import { getPruebas } from "./bueno.js"; */
import {
  coursesP,
  /*  escrollBehavorCo, */
  /*  getAllCourses, */
  ModalRemoveCourses,
  ModalShowCourses,
  openFormCourses,
} from "./courses.js";
import {
  getAllPromotions,
  ModalRemovePromotions,
  ModalShowPromotions,
  openFormPromotions,
} from "./promotions.js";
import {
  ModalShowResources,
  openFormResources,
  resourcep,
} from "./resource.js";

const d = document;
d.addEventListener("DOMContentLoaded", (e) => {
  /* getAllActivities(); */
  getAllPromotions();
  coursesP();
  /*   getPruebas(".crud-table"); */
  /*   tiempo_carga(); */
  activitiesp();
  resourcep();
});

/* insertActivities(); */
/*---------------------------------------Admin Activities--------------------------*/
ModalShowActivities(".fa-dot-circle", ".close", "#modal-container", ".modal");
ModalRemoveActivities(
  ".remove",
  ".close-de",
  "#modal-container-de",
  ".modal-de"
);
/* escrollBehavor(
  ".container__table--blue",
  ".head",
  ".body",
  ".container__tables"
); */

openFormActivities(
  ".btn__activities",
  /*  ".btn-submit", */
  ".cont-new-review",
  ".container__tables",
  "#container-noti"
);
/*---------------------------------------Admin Courses--------------------------*/

ModalShowCourses(
  ".fa-dot-circle",
  ".close-course",
  "#modal-container-course",
  ".modal-course"
);
ModalRemoveCourses(".remove", ".close-dc", "#modal-container-dc", ".modal-dc");
openFormCourses(".btn-courses", ".cont-new-course", ".cont-tables-course");
/* escrollBehavorCo(
  ".cont-table-course_blue",
  ".head",
  ".body",
  ".cont-tables-course"
);
 */
/*---------------------------------------Admin Promotions--------------------------*/
ModalShowPromotions(
  ".fa-dot-circle",
  ".close-promotion",
  "#modal-container-promotion",
  ".modal-promotion"
);
ModalRemovePromotions(".remove", ".close-d", "#modal-container-d", ".modal-d");
openFormPromotions(
  ".btn-promotion",
  ".cont-new-promotion",
  ".cont-tables-promotion"
);

/* ph(); */

/*--------------------------------------Admin Resource---------------------------------*/

openFormResources(
  ".btn-resource",
  ".cont-new-resource",
  ".cont-tables-resource"
);
ModalShowResources(
  ".fa-dot-circle",
  ".close-resource",
  "#modal-container-resource",
  ".modal-resource"
);

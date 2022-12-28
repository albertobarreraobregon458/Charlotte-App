const d = document,
  API_URL = `http://localhost:3000/course`,
  $formCourse = d.querySelector(".crud-form-course"),
  $titleCourse = d.querySelector(".crud-title-course"),
  $tbnCourse = d.getElementById("create-course"),
  $fragmentCourse = d.createDocumentFragment(),
  $tableCourse = d.querySelector(".crud-table-course");
/* 
const activity = d.querySelector(".table-course"); */
/* export function escrollBehavor(id1, id2) {
  window.sr = ScrollReveal();
  sr.reveal(id1, {
    duration: 2000,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id2, {
    duration: 2000,
    origin: "bottom",
    distance: "-5px",
  });
} */
export function ModalRemoveCourses(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    /*   if (e.target.matches(btnshow)) {
      console.log(e.target);
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d");
    } */
  });
}

export function ModalShowCourses(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-course");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-course");
    }
  });
}

export function openFormCourses(btnshow, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      /*   d.querySelector(modalContainer).style.visibility = "visible"; */

      d.querySelector(modal).classList.toggle("open-form-course");
      d.querySelector(table).classList.toggle("up-table-course");
    }
    /*     if (e.target.matches(btnclose)) {
        d.querySelector(modalContainer).style.visibility = "hidden"; 
       d.querySelector(modal).classList.toggle("open-form-input"); 
    } */
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Course title</th>
    <th>Category</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let course = [];
export function coursesP() {
  fetch(API_URL)
    .then((res) => res.json())
    .catch((error) => {
      console.log("error");
    })
    .then((res) => {
      course = res;
      renderCources(course);
    });
}

const renderCources = (course) => {
  let codigo = "";
  course.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.courseTitle}</td>
    <td>${ele.category}</td>
    <td>${ele.price}</td>
    <td>
        <div class="icons">
        <i class="fas fa-dot-circle read "></i>
        <i class="fas fa-pen edit" data-id = ${ele.id}></i> 
        <i class="fas fa-times-circle remove" data-idr =${ele.id}></i>
        </div>
    </td>
    </tr>
    </tbody>`;
    $tr.innerHTML = codigo;
    $fragmentCourse.appendChild($tr);
  });
  $tableCourse.innerHTML = CodeTh();
  $tableCourse.appendChild($fragmentCourse);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    e.preventDefault();
    const formData = new FormData($formCourse);
    const activity = {
      courseTitle: formData.get("courseTitle"),
      category: formData.get("category"),
      price: formData.get("price"),
      description: formData.get("description"),
    };
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(activity),
      headers: { "content-Type": "application/json" },
    })
      .then((res) => {
        res.json();
      })
      .catch((error) => {
        alertManager("error", error);
      })
      .then((res) => {
        alertManager("success", "Created Successfully");

        document.querySelector(".crud-form-course").reset();
        d.querySelector(".cont-tables-course").classList.toggle(
          "up-table-course"
        );
        d.querySelector(".cont-new-course").classList.toggle(
          "open-form-course"
        );
      });
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    $titleCourse.textContent = "Modify Courses";
    $tbnCourse.value = "Save Changes";
    $tbnCourse.classList.toggle("edit-two");
    $tbnCourse.classList.toggle("btn-submit");

    let id = e.target.dataset.id,
      actividades = {};
    course.filter((acti) => {
      if (acti.id == id) {
        actividades = acti;
      }
    });

    $formCourse.idi.value = id;
    $formCourse.courseTitle.value = actividades.courseTitle;
    $formCourse.category.value = actividades.category;
    $formCourse.price.value = actividades.price;
    $formCourse.description.value = actividades.description;
    d.querySelector(".cont-new-course").classList.toggle("open-form-course");
    d.querySelector(".cont-tables-course").classList.toggle("up-table-course");
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    const activity = {
      id: $formCourse.idi.value,
      courseTitle: $formCourse.courseTitle.value,
      category: $formCourse.category.value,
      price: $formCourse.price.value,
      description: $formCourse.description.value,
    };

    fetch(`${API_URL}/${activity.id}`, {
      method: "PUT",
      body: JSON.stringify(activity),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((response) => {
        d.querySelector(".cont-new-course").classList.toggle(
          "open-form-course"
        );
        d.querySelector(".cont-tables-course").classList.toggle(
          "up-table-course"
        );
        alertManager("update", "Edit Successfully");

        document.querySelector(".crud-form").reset();
      });
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".remove")) {
    let id = e.target.dataset.idr;
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((error) => {
        alertManager("error", error);
      })
      .then((res) => {
        d.querySelector("#modal-container-de").style.visibility = "visible";
        d.querySelector(".modal-de").classList.toggle("modal-close-de");

        alertManager("deleted", "Deleted Successfully");
        activitiesp();
      });
  }
});
function alertManager(typeMsg, message) {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3000);
}

/* export const getAllCourses = async () => {
  const $templateCourse = document.getElementById(
    "crud-template-course"
  ).content;
  try {
    let res = await fetch("http://localhost:3000/course"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.length === 0) {
      activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
    } else {
      json.forEach((ele) => {
        $templateCourse.querySelector(".id-course").textContent = ele.id;
        $templateCourse.querySelector(".courseTitle").textContent =
          ele.courseTitle;
        $templateCourse.querySelector(".category").textContent = ele.category;
        $templateCourse.querySelector(".price").textContent = ele.price;

        $templateCourse.querySelector(".edit").dataset.id = ele.id;
        $templateCourse.querySelector(".edit").dataset.courseTitle =
          ele.courseTitle;
        $templateCourse.querySelector(".edit").dataset.category = ele.category;
        $templateCourse.querySelector(".edit").dataset.price = ele.price;
        $templateCourse.querySelector(".edit").dataset.description =
          ele.description;
        $templateCourse.querySelector(".delete").dataset.id = ele.id;

        let $clone = d.importNode($templateCourse, true);
        $fragmentCourse.appendChild($clone);
      });
      $tableCourse.querySelector("tbody").appendChild($fragmentCourse);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";

  }
}; */

/* d.addEventListener("submit", async (e) => {
  if (e.target === $formCourse) {
    e.preventDefault();
    if (!e.target.idi.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              courseTitle: e.target.courseTitle.value,
              category: e.target.category.value,
              price: e.target.price.value,
              description: e.target.description.value,
            }),
          },
          res = await fetch("http://localhost:3000/course", options),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $formCourse.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  }
}); */

/* function edit() {
  d.addEventListener("submit", async (e) => {
    if (e.target === $formCourse) {
      e.preventDefault();
      if (e.target.idi.value) {
        try {
          let options = {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                courseTitle: e.target.courseTitle.value,
                category: e.target.category.value,
                price: e.target.price.value,
                description: e.target.description.value,
              }),
            },
            res = await fetch(
              `http://localhost:3000/course/${e.target.id.value}`,
              options
            ),
            json = await res.json();
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
          location.reload();
        } catch (error) {
          let message = err.statusText || "ocurrió un Error";
          $form.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          );
        }
      }
    }
  });
} */

/* d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();
    if (!e.target.id.value) {
      //POST
      try {
        let options = {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            activitiName: e.target.activitiName.value,
            category: e.target.category.value,
            level: e.target.level.value,
            author: e.target.author.value,
            tags: e.target.tags.value,
            description: e.target.description.value,
          }),
        };
        (res = await fetch("http://localhost:3000/activities", options)),
          (json = await res.json());
        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        location.reload();
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    } else {
      //PUT
      try {
        let options = {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            activitiName: e.target.activitiName.value,
            category: e.target.category.value,
            level: e.target.level.value,
            author: e.target.author.value,
            tags: e.target.tags.value,
            description: e.target.description.value,
          }),
        };
        (res = await fetch(
          `http://localhost:3000/activities/${e.target.id.value}`,
          options
        )),
          (json = await res.json());
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        if (res) window.location.href = "/src/views/activity/actividades.html";
       location.reload(); 
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  }
}); */

/* d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    d.querySelector(".cont-new-course").classList.toggle("open-form-course");
    d.querySelector(".cont-tables-course").classList.toggle("up-table-course");

    $titleCourse.textContent = "Modify Course";
    $tbnCourse.value = "Save Changes";
    $formCourse.courseTitle.value = e.target.dataset.courseTitle;
    $formCourse.category.value = e.target.dataset.category;
    $formCourse.price.value = e.target.dataset.price;
    $formCourse.description.value = e.target.dataset.description;
  }

  let p = false;
  if (e.target.matches(".remove")) {
    d.querySelector("#modal-container-d").style.visibility = "visible";
    d.querySelector(".modal-d").classList.toggle("modal-close-d");
    p = true;
    if (p) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        };
        (res = await fetch(
          `http://localhost:3000/course/${e.target.dataset.id}`,
          options
        )),
          (json = await res.json());
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $formCourse.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  }
  if (e.target.matches(".delete")) {
    
    let isdelete = confirm("delete?");
    if (isdelete) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        };
        (res = await fetch(
          `http://localhost:3000/activities/${e.target.dataset.id}`,
          options
        )),
          (json = await res.json());
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  } 
});
 */
/* 
export function escrollBehavorCo(id1, id2, id3, id4) {
  window.sr = ScrollReveal();
  sr.reveal(id1, {
    duration: 7700,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id2, {
    duration: 7500,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id3, {
    duration: 7500,
    origin: "bottom",
    distance: "-5px",
  });
  sr.reveal(id4, {
    duration: 1000,
    origin: "bottom",
    distance: "-5px",
  });
}
 */

const d = document;
const API_URL = `http://localhost:3000/resource`,
  $formResource = d.querySelector(".crud-form-resource"),
  $titleResource = d.querySelector(".crud-title-resource"),
  $tbnResource = d.getElementById("create-resource"),
  $tableResource = d.querySelector(".crud-table-resource"),
  $fragment = d.createDocumentFragment();

export function ModalRemoveResources(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    /* if (e.target.matches(btnshow)) {
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

export function ModalShowResources(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close");
    }
  });
}

export function openFormResources(btnshow, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      /*   d.querySelector(modalContainer).style.visibility = "visible"; */

      d.querySelector(modal).classList.toggle("open-form-resource");
      d.querySelector(table).classList.toggle("up-table-resource");
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
    <th>Resources</th>
    <th>Category</th>
    <th>Tags</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let resource = [];
export function resourcep() {
  fetch(API_URL)
    .then((res) => res.json())
    .catch((error) => {
      console.log("error");
    })
    .then((res) => {
      resource = res;
      renderResources(resource);
    });
}
const renderResources = (resource) => {
  let codigo = "";
  resource.forEach((ele) => {
    const $tr = d.createElement("tr");
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.resourceTitle}</td>
    <td>${ele.category}</td>
    <td>${ele.tags}</td>
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
    $fragment.appendChild($tr);
  });
  $tableResource.innerHTML = CodeTh();
  $tableResource.appendChild($fragment);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    e.preventDefault();
    const formData = new FormData($formResource);
    const activity = {
      resourceTitle: formData.get("resourceTitle"),
      category: formData.get("category"),
      tags: formData.get("tags"),
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
        /*  activitiesp(); */
        document.querySelector(".crud-form-resource").reset();
        d.querySelector(".cont-tables-resource").classList.toggle(
          "up-table-resource"
        );
        d.querySelector(".cont-new-resource").classList.toggle(
          "open-form-resource"
        );
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

/* function CodeTd(id, courseTitle, category, price) {
    let codigo = `
    <tr class = "tr">
    <td>${id}</td>
    <td>${courseTitle}</td>
    <td>${category} </td>
    <td>${price}</td>
    <td>
        <div class="icons">
        <i class="fas fa-dot-circle read "></i>
        <a href="modify.html"> <i class="fas fa-pen edit"></i></a>
        <i class="fas fa-times-circle remove"></i>
        </div>
    </td>
    </tr>`;
    return codigo;
  }
   */
/* function CodeTh() {
    let code = `
    <tr class = "th">
    <th>ID</th>
    <th>Course title</th>
    <th>Category</th>
    <th>Price</th>
    <th>Actions</th>
    </tr>
    `;
    return code;
  } */

/* export function getCourses(table) {
    const activity = d.querySelector(table),
      $fragment = d.createDocumentFragment();
    async function courses() {
      try {
        let res = await fetch("http://localhost:3000/course"),
          json = await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        if (json.length === 0) {
          activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
        } else {
          json.forEach((ele) => {
            const $tr = d.createElement("tr");
            $tr.innerHTML = CodeTd(
              ele.id,
              ele.courseTitle,
              ele.category,
              ele.price
            );
            $fragment.appendChild($tr);
          });
          activity.innerHTML = CodeTh();
          activity.appendChild($fragment);
        }
      } catch (err) {
        let message = "ocurrió un error al obter la ruta de API";
          activity.innerHTML = `Error ${err.status}: ${message}`; 
      }
    }
    courses();
  }
   */

/* const activity = d.querySelector(".table-course");  */

/* export const getAllCourses = async () => {
  const $templateCourse = document.getElementById(
    "crud-template-course"
  ).content;
  try {
    let res = await fetch("http://localhost:3000/resource"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.length === 0) {
      activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
    } else {
      json.forEach((ele) => {
        $templateCourse.querySelector(".id-resource").textContent = ele.id;
        $templateCourse.querySelector(".resourceTitle").textContent =
          ele.courseTitle;
        $templateCourse.querySelector(".resourceCategory").textContent =
          ele.category;
        $templateCourse.querySelector(".resourceTags").textContent = ele.price;
        $templateCourse.querySelector(".resourceT").textContent = ele.price;

        $templateCourse.querySelector(".edit").dataset.id = ele.id;
        $templateCourse.querySelector(".edit").dataset.resourceTitle =
          ele.resourceTitle;
        $templateCourse.querySelector(".edit").dataset.resourcecategory =
          ele.resourcecategory;
        $templateCourse.querySelector(".edit").dataset.resourceTags =
          ele.resourceTags;
        $templateCourse.querySelector(".edit").dataset.resourceDescription =
          ele.resourceDescription;
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
});
/*  */
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

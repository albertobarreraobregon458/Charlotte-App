const d = document;
const API_URL = `http://localhost:3000/activities`,
  $formActivity = d.querySelector(".crud-form"),
  $titleActivity = d.querySelector(".crud-title"),
  $tbnActivity = d.getElementById("create-review"),
  $tableActivity = d.querySelector(".crud-table"),
  $fragment = d.createDocumentFragment();

/* const activity = d.querySelector(".table"); */

export function escrollBehavor(id1, id2, id3, id4) {
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
export function ModalRemoveActivities(
  btnshow,
  btnclose,
  modalContainer,
  modal
) {
  d.addEventListener("click", async (e) => {
    /*  if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    } */
    if (e.target.matches(btnclose)) {
      /*  d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d"); */
    }
  });
}

export function ModalShowActivities(btnshow, btnclose, modalContainer, modal) {
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

export function openFormActivities(btnshow, modal, table, noti) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modal).classList.toggle("open-form-input");
      d.querySelector(table).classList.toggle("up-table");
      d.querySelector(noti).classList.toggle("noticia");
    }
  });
}

function CodeTh() {
  let code = `
    <thead class ="head">
    <tr class = "th">
    <th>ID</th>
    <th>Activity title</th>
    <th>Category</th>
    <th>Tags</th>
    <th>Actions</th>
    </tr>
    </thead>
    `;
  return code;
}

let activi = [];
export function activitiesp() {
  fetch(API_URL)
    .then((res) => res.json())
    .catch((error) => {
      console.log("error");
    })
    .then((res) => {
      activi = res;
      renderActivities(activi);
    });
}
const renderActivities = (activitie) => {
  let codigo = "";
  activitie.forEach((ele) => {
    const $tr = d.createElement("tr");
    if (ele.category === "FREE") {
      console.log("true");
    }
    codigo = `
    <tbody class = "body">
    <tr class = "tr">
    <td>${ele.id}</td>
    <td>${ele.activitiName}</td>
    <td>[${ele.category}] ${ele.level}</td>
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
  $tableActivity.innerHTML = CodeTh();
  $tableActivity.appendChild($fragment);
};

d.addEventListener("click", (e) => {
  if (e.target.matches(".btn-submit")) {
    const formData = new FormData($formActivity);
    const activity = {
      activitiName: formData.get("activitiName"),
      category: formData.get("category"),
      level: formData.get("level"),
      author: formData.get("author"),
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
        document.querySelector(".crud-form").reset();
        d.querySelector(".container__tables").classList.toggle("up-table");
        d.querySelector(".cont-new-review").classList.toggle("open-form-input");
        d.querySelector("#container-noti").classList.toggle("noticia");
      });
  }
});
d.addEventListener("click", (e) => {
  if (e.target.matches(".edit")) {
    e.preventDefault();
    $titleActivity.textContent = "Modify Activity";
    $tbnActivity.value = "Save Changes";
    $tbnActivity.classList.toggle("edit-two");
    $tbnActivity.classList.toggle("btn-submit");

    let id = e.target.dataset.id,
      actividades = {};
    activi.filter((acti) => {
      if (acti.id == id) {
        actividades = acti;
      }
    });

    $formActivity.idi.value = id;
    $formActivity.activitiName.value = actividades.activitiName;
    $formActivity.category.value = actividades.category;
    $formActivity.level.value = actividades.level;
    $formActivity.author.value = actividades.author;
    $formActivity.tags.value = actividades.tags;
    $formActivity.description.value = actividades.description;
    d.querySelector(".cont-new-review").classList.toggle("open-form-input");
    d.querySelector(".container__tables").classList.toggle("up-table");
    d.querySelector("#container-noti").classList.toggle("noticia");
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches(".edit-two")) {
    e.preventDefault();
    const activity = {
      id: $formActivity.idi.value,
      activitiName: $formActivity.activitiName.value,
      category: $formActivity.category.value,
      level: $formActivity.level.value,
      author: $formActivity.author.value,
      tags: $formActivity.tags.value,
      description: $formActivity.description.value,
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
        d.querySelector(".cont-new-review").classList.toggle("open-form-input");
        d.querySelector(".container__tables").classList.toggle("up-table");
        d.querySelector("#container-noti").classList.toggle("noticia");
        alertManager("update", "Edit Successfully");

        document.querySelector(".crud-form").reset();
      });
  }
});

/* const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert");

  alert.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3000);
}; */

const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3000);
};

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
        /*    d.querySelector("#modal-container-de").style.visibility = "visible";
        d.querySelector(".modal-de").classList.toggle("modal-close-de"); */

        alertManager("deleted", "Deleted Successfully");
        activitiesp();
      });
  }
});
/* export const getAllActivities = async () => {
  const $templateActivity = d.getElementById("crud-template").content;
  try {
    let res = await fetch("http://localhost:3000/activities"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.length === 0) {
      activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
    } else {
      json.forEach((ele) => {
        $templateActivity.querySelector(".id-activitie").textContent = ele.id;
        $templateActivity.querySelector(".nameActivity").textContent =
          ele.activitiName;
        $templateActivity.querySelector(
          ".category"
        ).textContent = `${ele.category} ${ele.level}`;
        $templateActivity.querySelector(".tags").textContent = ele.tags;
        /*   $template.querySelector(".description").textContent = ele.description; */
/*  $templateActivity.querySelector(".edit").dataset.id = ele.id;
        $templateActivity.querySelector(".edit").dataset.activitiName =
          ele.activitiName;
        $templateActivity.querySelector(".edit").dataset.category =
          ele.category;
        $templateActivity.querySelector(".edit").dataset.level = ele.level;
        $templateActivity.querySelector(".edit").dataset.author = ele.author;
        $templateActivity.querySelector(".edit").dataset.tags = ele.tags;
        $templateActivity.querySelector(".edit").dataset.description =
          ele.description;
        $templateActivity.querySelector(".delete").dataset.id = ele.id;

        let $clone = d.importNode($templateActivity, true);
        $fragmentActivity.appendChild($clone);
      });
      $tableActivity.querySelector("tbody").appendChild($fragmentActivity);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
    
  } 
}; */
/* 
export function insertActivities() {
  function alberto(callback1) {
    callback1();
  }
  alberto(activities);
 alertManager(success, msgSucces); 
}
let msgdeletd = "Deleted Successfully",
  deleted = "deleted",
  msgSucces = "Created Successfully ",
  success = "success",
  msgUpdate = "Updated Succesfully",
  update = "update"; */
/* 
function activities() {
  d.addEventListener("submit", async (e) => {
    if (e.target === $formActivity) {
      e.preventDefault();
      if (!e.target.id.value) {
        ///CREATE POST
        try {
          let options = {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                activitiName: e.target.activitiName.value,
                category: e.target.category.value,
                level: e.target.level.value,
                author: e.target.author.value,
                tags: e.target.tags.value,
                description: e.target.description.value,
              }),
            },
            res = await fetch("http://localhost:3000/activities", options),
            json = await res.json();

          if (!res.ok) throw { status: res.status, statusText: res.statusText };
        } catch (error) {
          let message = err.statusText || "ocurrió un Error";
          $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          );
        }
      } else {
        //UPDATE -PUT
        try {
          let options = {
              method: "PUT",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                activitiName: e.target.activitiName.value,
                category: e.target.category.value,
                level: e.target.level.value,
                author: e.target.author.value,
                tags: e.target.tags.value,
                description: e.target.description.value,
              }),
            },
            res = await fetch(
              `http://localhost:3000/activities/${e.target.id.value}`,
              options
            ),
            json = await res.json();
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
          location.reload();
        } catch (error) {
          let message = err.statusText || "ocurrió un Error";
          $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          );
        }
      }
    }
  });
} */

/* export function ph() {
  d.addEventListener("click", async (e) => {
    if (e.target.matches(".edit")) {
      d.querySelector(".cont-new-review").classList.toggle("open-form-input");
      d.querySelector(".container__tables").classList.toggle("up-table");
      $titleActivity.textContent = "Modify Activity";
      $tbnActivity.value = "Save Changes";
      $formActivity.activitiName.value = e.target.dataset.activitiName;
      $formActivity.category.value = e.target.dataset.category;
      $formActivity.level.value = e.target.dataset.level;
      $formActivity.author.value = e.target.dataset.author;
      $formActivity.tags.value = e.target.dataset.tags;
      $formActivity.description.value = e.target.dataset.description;
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
            `http://localhost:3000/activities/${e.target.dataset.id}`,
            options
          )),
            (json = await res.json());
          if (!res.ok) throw { status: res.status, statusText: res.statusText };
          location.reload();
        } catch (error) {
          let message = err.statusText || "ocurrió un Error";
          $formActivity.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}:${message}</p></b>`
          );
        }
      }
    }
  });
}
 */
/* const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert"),
    me = document.querySelector(".parrafo-succes");

  me.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3000);
};
 */
/* 
function CodeTd(id, activitiName, category, level, tags) {
  let codigo = `
  <tbody/>
  <tr class = "tr">
  <td>${id}</td>
  <td>${activitiName}</td>
  <td>${category} ${level}</td>
  <td>${tags}</td>
  <td>
      <div class="icons">
      <i class="fas fa-dot-circle read "></i>
      <a href="modify.html"> <i class="fas fa-pen edit"></i></a>
      <i class="fas fa-times-circle remove"></i>
      </div>
  </td>
  </tr>
  </tbody>`;
  return codigo;
}

function CodeTh() {
  let code = `
  <thead>
  <tr class = "th">
  <th>ID</th>
  <th>Activity title</th>
  <th>Category</th>
  <th>Tags</th>
  <th>Actions</th>
  </tr>
  </thead>
  `;
  return code;
}

export function getActivities(table) {
  const activity = d.querySelector(table),
    $fragment = d.createDocumentFragment();
  async function activities() {
    try {
      let res = await fetch("http://localhost:3000/activities"),
        json = await res.json();
      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      if (json.length === 0) {
        activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
      } else {
        json.forEach((ele) => {
          const $tr = d.createElement("tr");
          $tr.innerHTML = CodeTd(
            ele.id,
            ele.activitiName,
            ele.category,
            ele.level,
            ele.tags
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
  activities();
}
 */
var inicio = new Date();

export function tiempo_carga() {
  var fin = new Date();
  var segundos = (fin - inicio) / 1000;
  var salida = "La pagina ha sido cargada en " + segundos + " segundos";
  document.getElementById("tiempoCarga").innerHTML = salida;
}

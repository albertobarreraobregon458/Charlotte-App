/* import { abrirModalRemove } from "./activities"; */

const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $tbn = d.getElementById("create-review"),
  $fragment = d.createDocumentFragment();
console.log($fragment, $table);
const activity = d.querySelector(".table");

const getAll = async () => {
  try {
    let res = await fetch("http://localhost:3000/activities"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    if (json.length === 0) {
      activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`;
    } else {
      json.forEach((ele) => {
        $template.querySelector(".id-activitie").textContent = ele.id;
        $template.querySelector(".nameActivity").textContent = ele.activitiName;
        $template.querySelector(
          ".category"
        ).textContent = `${ele.category} ${ele.level}`;
        $template.querySelector(".tags").textContent = ele.tags;
        /*   $template.querySelector(".description").textContent = ele.description; */
        $template.querySelector(".edit").dataset.id = ele.id;
        $template.querySelector(".edit").dataset.activitiName =
          ele.activitiName;
        $template.querySelector(".edit").dataset.category = ele.category;
        $template.querySelector(".edit").dataset.level = ele.level;
        $template.querySelector(".edit").dataset.author = ele.author;
        $template.querySelector(".edit").dataset.tags = ele.tags;
        $template.querySelector(".edit").dataset.description = ele.description;
        $template.querySelector(".delete").dataset.id = ele.id;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $table.querySelector("tbody").appendChild($fragment);
    }
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
    /*  $table.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}:${message}</p></b>`
    ); */
  }
};

d.addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
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
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      } finally {
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
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      } finally {
        /*    window.location.href = "/src/views/activity/actividades.html";
        let element = document.querySelector(".sucesx");
        setTimeout(() => {
          element.classList.toggle("container-notify-succes");
        }, 3000); */
      }
    }
  }
});

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
/*    abrirModalRemove(".remove", ".close-d", "#modal-container-d", ".modal-d") */
let a = document.querySelector(".remove"),
  b = document.querySelector(".close-d"),
  c = document.querySelector("#modal-container-d"),
  f = document.querySelector(".modal-d");

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    d.querySelector(".cont-new-review").classList.toggle("open-form-input");
    d.querySelector(".container__tables").classList.toggle("up-table");
    $title.textContent = "Modify Activity";
    $tbn.value = "Save Changes";
    $form.activitiName.value = e.target.dataset.activitiName;
    $form.category.value = e.target.dataset.category;
    $form.level.value = e.target.dataset.level;
    $form.author.value = e.target.dataset.author;
    $form.tags.value = e.target.dataset.tags;
    $form.description.value = e.target.dataset.description;
  }
  let p = false;
  if (e.target.matches(".remove")) {
    d.querySelector("#modal-container-d").style.visibility = "visible";
    d.querySelector(".modal-d").classList.toggle("modal-close-d");
    p = false;
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
        $form.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  }
});

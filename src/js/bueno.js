const API_URL = `http://localhost:3000/activities`,
  d = document;

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

export function getPruebas(table) {
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

const alertManager = (typeMsg, message) => {
  const alert = document.querySelector("#alert");

  alert.innerHTML = message || "Se produjo cambios";
  alert.classList.add(typeMsg);
  alert.style.display = "block";

  setTimeout(() => {
    alert.style.display = "none";
    alert.classList.remove(typeMsg);
  }, 3500);
};

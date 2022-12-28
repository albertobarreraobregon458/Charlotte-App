const d = document;
export function ModalRemovePromotions(
  btnshow,
  btnclose,
  modalContainer,
  modal
) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      console.log(e.target);
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-d");
    }
  });
}

export function ModalShowPromotions(btnshow, btnclose, modalContainer, modal) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      d.querySelector(modalContainer).style.visibility = "visible";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
    if (e.target.matches(btnclose)) {
      d.querySelector(modalContainer).style.visibility = "hidden";
      d.querySelector(modal).classList.toggle("modal-close-promotion");
    }
  });
}

export function openFormPromotions(btnshow, modal, table) {
  d.addEventListener("click", (e) => {
    if (e.target.matches(btnshow)) {
      console.log("holaaa");
      /*   d.querySelector(modalContainer).style.visibility = "visible"; */
      d.querySelector(modal).classList.toggle("open-form-promotion");
      d.querySelector(table).classList.toggle("up-table-promotion");
    }
    /*     if (e.target.matches(btnclose)) {
        d.querySelector(modalContainer).style.visibility = "hidden"; 
       d.querySelector(modal).classList.toggle("open-form-input"); 
    } */
  });
}

const $formPromotion = d.querySelector(".crud-form-promotion"),
  $titlePromotion = d.querySelector(".crud-title-promotion"),
  $tbnPromotion = d.getElementById("create-promotion"),
  $tablePromotion = d.querySelector(".crud-table-promotion"),
  activity = d.querySelector(".table-promotion"),
  $fragmentPromotion = d.createDocumentFragment();

/* const activity = d.querySelector(".table-promotion"); */

export const getAllPromotions = async () => {
  const $templatePromotion = d.getElementById(
    "crud-template-promotion"
  ).content;
  try {
    let res = await fetch("http://localhost:3000/promotion"),
      json = await res.json();
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    /*   activity.innerHTML = `<div class = "no-activities">NO ACTIVITIES YET</div>`; */

    json.forEach((ele) => {
      $templatePromotion.querySelector(".id-promotion").textContent = ele.id;
      $templatePromotion.querySelector(".promotionTitle").textContent =
        ele.promotionTitle;
      $templatePromotion.querySelector(".promotionPrice").textContent =
        ele.promotionPrice;
      $templatePromotion.querySelector(".promotionOffer").textContent =
        ele.promotionOffer;
      $templatePromotion.querySelector(".promotionDateStart").textContent =
        ele.promotionDateStart;

      $templatePromotion.querySelector(".edit").dataset.id = ele.id;
      $templatePromotion.querySelector(".edit").dataset.promotionTitle =
        ele.promtionTitle;
      $templatePromotion.querySelector(".edit").dataset.promotionPrice =
        ele.promotionPrice;
      $templatePromotion.querySelector(".edit").dataset.promotionOffer =
        ele.promotionOffer;
      $templatePromotion.querySelector(".edit").dataset.promotionDateStart =
        ele.promotionDateStart;
      $templatePromotion.querySelector(".edit").dataset.promotionDateEnd =
        ele.promotionDateEnd;
      $templatePromotion.querySelector(".delete").dataset.id = ele.id;

      let $clone = d.importNode($templatePromotion, true);
      $fragmentPromotion.appendChild($clone);
    });
    $tablePromotion.querySelector("tbody").appendChild($fragmentPromotion);
  } catch (err) {
    let message = err.statusText || "ocurrió un Error";
    /*     $tablePromotion.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}:${message}</p></b>`
    ); */
  }
  /*   alertManager("deleted", " Succesfully"); */
};

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
}; */

/* let msgdeletd = "Deleted Successfully",
  deleted = "deleted",
  msgSucces = "Created Successfully ",
  success = "success",
  msgUpdate = "Updated Succesfully",
  update = "update";
alertManager(update, msgUpdate); */

/* d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();
    if (!e.target.id.value) {
      ///CREATE POST
      try {
        let options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              promtionTitle: e.target.promtionTitle.value,
              promotionPrice: e.target.promotionPrice.value,
              promotionOffer: e.target.promotionOffer.value,
              promotionDateStart: e.target.promotionDateStart.value,
              promotionDateEnd: e.target.promotionDateEnd.value,
            }),
          },
          res = await fetch("http://localhost:3000/promotion", options),
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
    
    }
    }
  }
}); */

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

    $title.textContent = "Modify Course";
    $tbn.value = "Save Changes";
    $form.courseTitle.value = e.target.dataset.courseTitle;
    $form.category.value = e.target.dataset.category;
    $form.price.value = e.target.dataset.price;
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
          `http://localhost:3000/course/${e.target.dataset.id}`,
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

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    d.querySelector(".cont-new-promotion").classList.toggle(
      "open-form-promotion"
    );
    d.querySelector(".cont-tables-promotion").classList.toggle(
      "up-table-promotion"
    );
    $templatePromotion.querySelector(".id-promotion").textContent = ele.id;
    $templatePromotion.querySelector(".promotionTitle").textContent =
      ele.promotionTitle;
    $templatePromotion.querySelector(".promotionPrice").textContent =
      ele.promotionPrice;
    $templatePromotion.querySelector(".promotionOffer").textContent =
      ele.promotionOffer;
    $templatePromotion.querySelector(".promotionDateStart").textContent =
      ele.promotionDateStart;

    $titlePromotion.textContent = "Modify Promotion";
    $tbnPromotion.value = "Save Changes";
    $formPromotion.promotionTitle.value = e.target.dataset.promotionTitle;
    $formPromotion.promotionPrice.value = e.target.dataset.promotionPrice;
    $formPromotion.promotionOffer.value = e.target.dataset.promotionOffere;
    $formPromotion.promotionDateStart.value =
      e.target.dataset.promotionDateStart;
    $formPromotion.promotionDateEnd.value = e.target.dataset.promotionDateEnd;
  }

  if (e.target.matches(".remove")) {
    d.querySelector("#modal-container-d").style.visibility = "visible";
    d.querySelector(".modal-d").classList.toggle("modal-close-d");
    let z = false;
    if (z) {
      try {
        let options = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=utf-8",
          },
        };
        (res = await fetch(
          `http://localhost:3000/promotion/${e.target.dataset.id}`,
          options
        )),
          (json = await res.json());
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
        location.reload();
      } catch (error) {
        let message = err.statusText || "ocurrió un Error";
        $formPromotion.insertAdjacentHTML(
          "afterend",
          `<p><b>Error ${err.status}:${message}</p></b>`
        );
      }
    }
  }
  /*   if (e.target.matches(".delete")) {
    
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
  } */
});
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
}; */

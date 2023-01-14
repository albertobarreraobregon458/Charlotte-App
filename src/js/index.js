export function validaEmail(section) {
  let validEmai = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  let l =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!validEmai.test(section)) {
    const value = section;
    section = "* enter a valid email";

    setTimeout(() => {
      section = value;
    }, 1500);

    return;
  }
}

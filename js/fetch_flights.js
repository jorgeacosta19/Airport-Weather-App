const d = document,
  $departures = d.querySelector(".departures"),
  $arrivals = d.querySelector(".arrivals"),
  $TemplateDepartures = d.getElementById("template-departures").content,
  $TemplateArrivals = d.getElementById("template-arrivals").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await fetch("http://localhost:3000/departureFlights"),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log(json);

    json.forEach((element) => {
      $TemplateDepartures.querySelector(".time").textContent = element.time;
      $TemplateDepartures.querySelector(".airport").textContent =
        element.airportName;
      $TemplateDepartures.querySelector(".flight-number").textContent =
        element.flightNumber;
      //   $TemplateArrivals.querySelector(".time").textContent = element.time;
      //   $TemplateArrivals.querySelector(".airport").textContent =
      //     element.airportName;
      //   $TemplateArrivals.querySelector(".flight-number").textContent =
      //     element.flightNumber;

      let $clone = d.importNode($TemplateDepartures, true);
      $fragment.appendChild($clone);

      $departures.querySelector("template").appendChild($fragment);
    });
  } catch (err) {
    console.log(err);
    let message = err.statusText || "We couldn't get the status of the flights";
    $departures.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</p></b>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getAll);
const getArrivals = async () => {
  try {
    let res = await fetch("http://localhost:3000/arrivalFlights"),
      json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    console.log(json);

    json.forEach((element) => {
      $TemplateArrivals.querySelector(".time").textContent = element.time;
      $TemplateArrivals.querySelector(".airport").textContent =
        element.airportName;
      $TemplateArrivals.querySelector(".flight-number").textContent =
        element.flightNumber;

      let $clone = d.importNode($TemplateArrivals, true);
      $fragment.appendChild($clone);

      $arrivals.querySelector(".template-arrivals").appendChild($fragment);
    });
  } catch (err) {
    console.log(err);
    let message = err.statusText || "We couldn't get the status of the flights";
    $departures.insertAdjacentHTML(
      "afterend",
      `<p><b>Error ${err.status}: ${message}</p></b>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getArrivals);

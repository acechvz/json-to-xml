import { API_URL } from "./constants";

export const fetchXMLData = data =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/xml"
    },
    body: data
  })
    .then(response => response.text())
    .then(resp => {
      const parser = new DOMParser();
      return parser.parseFromString(resp, "text/xml");
    });

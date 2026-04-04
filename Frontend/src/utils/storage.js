import { initialProperties } from "../data/mockdata.js";

export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("hv_user")); } catch { return null; }
}

export function getStoredProps() {
  try { return JSON.parse(localStorage.getItem("hv_props")) || initialProperties; } catch { return initialProperties; }
}

export function saveProps(props) { localStorage.setItem("hv_props", JSON.stringify(props)); }
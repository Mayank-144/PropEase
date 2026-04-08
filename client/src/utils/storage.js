import { initialProperties } from "../data/mockdata.js";

export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("hv_user")); } catch { return null; }
}

export function getStoredProps() {
  try { 
    const local = JSON.parse(localStorage.getItem("hv_props"));
    if (!local) return initialProperties;
    // Smart merge: Add any new initial properties that aren't in the user's local storage yet
    const newProps = initialProperties.filter(ip => !local.find(lp => lp.id === ip.id));
    if (newProps.length > 0) {
      const merged = [...local, ...newProps];
      localStorage.setItem("hv_props", JSON.stringify(merged));
      return merged;
    }
    return local;
  } catch { return initialProperties; }
}

export function saveProps(props) { localStorage.setItem("hv_props", JSON.stringify(props)); }
import { url } from "../config";
export default function assetsURL(str) {
  return `${url}${String(str).replace("\\", "/")}`;
}

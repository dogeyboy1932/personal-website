import { error } from "@sveltejs/kit";
import { pageData } from "../../../constants/pages";

export function load({ params }) {
  const page = pageData[params.slug];

  if (page) {
    return {
      page,
    };
  }

  throw error(404, "Not found");
}

import { defineRailway, github, project, service } from "railway/iac";

export default defineRailway(() => {
  const web = service("willys", {
    source: github("WillRaphaelson/willys-static-site"),
    healthcheck: "/",
  });
  return project("willys-static-site", { resources: [web] });
});

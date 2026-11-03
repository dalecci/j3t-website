// Canonical-host redirect for J3T Management.
// Sends www.j3taviation.com and the production *.pages.dev host to the apex
// (https://j3taviation.com) with a 301, preserving path + query string.
// Preview deploys (<branch>.j3t-website.pages.dev) are left alone so they can be tested.
const APEX = "j3taviation.com";
const REDIRECT_HOSTS = new Set([
  "www.j3taviation.com",   // www -> apex
  "j3t-website.pages.dev", // production Pages host -> apex
]);

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (REDIRECT_HOSTS.has(url.hostname.toLowerCase())) {
    url.protocol = "https:";
    url.hostname = APEX;
    url.port = "";
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

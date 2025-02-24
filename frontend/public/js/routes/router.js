export const routes = [
  {
    pattern: "/",
    loader: () => import("/js/views/home.js"),
  },
  {
    pattern: "/about",
    loader: () => import("/js/views/about.js"),  },

  {
    pattern: "/users/:userId",
    loader: () => import("/js/views/userDashboard.js"),
  },
  {
    pattern: "/contact",
    loader: () => import("/js/views/contact.js"),
  },
  {
    pattern: "/login",
    loader: () => import("/js/views/login.js"),
  },
  {
    pattern: "/registration",
    loader: () => import("/js/views/registration.js"),
    styles: [{href: "../styles/registration.css", id: "registrationStyles"}]
  },
  ,
  {//this has to be the last one
    pattern: "*",
    loader: () => import("/js/views/notFound.js"),
  },

];

function matchRoute(pattern, pathname) {
  // If pattern is exactly "*" return an empty params object.
  if (pattern === "*") return {};

  // Split both pattern and pathname into segments.
  const patternSegments = pattern.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);

  // Check if the pattern ends with a wildcard segment "*".
  const hasWildcard = patternSegments[patternSegments.length - 1] === "*";

  // If there is no wildcard, the number of segments must match exactly.
  if (!hasWildcard && patternSegments.length !== pathSegments.length) {
    return null;
  }

  // If there is a wildcard, the pattern (without the wildcard) must not have more segments than the path.
  if (hasWildcard && patternSegments.length - 1 > pathSegments.length) {
    return null;
  }

  const params = {};
  // Iterate over each segment in the pattern.
  for (let i = 0; i < patternSegments.length; i++) {
    const patSeg = patternSegments[i];
    if (patSeg === "*") {
      // Capture all remaining segments in a "wildcard" parameter.
      params["wildcard"] = pathSegments.slice(i);
      break;
    } else if (patSeg.startsWith(":")) {
      // Extract the parameter name and assign the corresponding path segment.
      const paramName = patSeg.slice(1);
      params[paramName] = pathSegments[i];
    } else if (patSeg !== pathSegments[i]) {
      // A static segment doesn't match.
      return null;
    }
  }
  return params;
}

function resolveRoute(pathname) {
  for (const route of routes) {
    const params = matchRoute(route.pattern, pathname);
    if (params !== null) {
      return {
        loader: route.loader,
        styles: route.styles || [],
        params,
      };
    }
  }

  const fallback = routes.find((r) => r.pattern === "*");
  return {
    loader: fallback.loader,
    params: {},
    styles: fallback.styles || []
  };
}

export async function initRouter() {
  const path = window.location.pathname;
  await renderView(path);
}

// async function renderView(path) {
//   const rootDiv = document.getElementById('root');
//   const content = await getViewContent(path);
//   rootDiv.innerHTML = content;
// }

export async function renderView(path) {
  const { loader, params, styles } = resolveRoute(path);
  const { render, init } = await loader();
  const markup = render();
  const rootDiv = document.getElementById("root");
  rootDiv.innerHTML = markup;
  // Ensure the DOM is updated before calling init.
  requestAnimationFrame(() => {
    if (typeof init === "function") {
      init(styles, params);
    }
  });
}

// Intercept clicks on links with the data-link attribute
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-link]");
  if (link) {
    event.preventDefault();
    const href = link.getAttribute("href");
    navigateTo(href);
  }
});

export function navigateTo(path) {
  // Update the browser's URL without reloading the page.
  window.history.pushState({}, "", window.location.origin + path);
  
  // Render the view for the new path.
  renderView(path);
}

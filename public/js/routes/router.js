export const routes = [
  {
    pattern: "/",
    loader: () => import("/js/views/home.js"),
    styles: [
      {
        href: "/styles/index.css",
        id: "indexStyles",
      },
    ],
  },

  {
    pattern: "/AIchat",
    loader: () => import("/js/views/AIChat.js"),
    styles: [
      {
        href: "/styles/AIchat.css",
        id: "AIchat123",
      },
    ],
  },

  {
    pattern: "/admin_dashboard",
    loader: () => import("/js/views/admin_dashboard.js"),
    styles: [
      {
        href: "/styles/admin_dashboard.css",
        id: "admin_dashboard123",
      },
    ],
  },

  {
    pattern: "/doctor_dashboard",
    loader: () => import("/js/views/doctor_dashboard.js"),
    styles: [
      {
        href: "/styles/doctor_dashboard.css",
        id: "doctor_dashboard123",
      },
    ],
  },
  {
    pattern: "/user_dashboard",
    loader: () => import("/js/views/user_dashboard.js"),
    styles: [
      {
        href: "/styles/user_dashboard.css",
        id: "user_dashboard123",
      },
    ],
  },

  {
    pattern: "/about",
    loader: () => import("/js/views/about.js"),
    styles: [
      {
        href: "/styles/about.css",
        id: "about123",
      },
    ],
  },
  {
    pattern: "/faq",
    loader: () => import("/js/views/faq.js"),
    styles: [
      {
        href: "/styles/faq.css",
        id: "faqStyles",
      },
    ],
  },
  {
    pattern: "/chat",
    loader: () => import("/js/views/AIChat.js"),
    styles: [
      {
        href: "/styles/AIChat.css",
        id: "AIChatStyles",
      },
    ],
  },
  {
    pattern: "/services",
    loader: () => import("/js/views/services.js"),
    styles: [
      {
        href: "/styles/services.css",
        id: "services123",
      },
    ],
  },
  {
    pattern: "/admin/dashboard/user",
    loader: () => import("/js/views/adminView/creatingUser.js"),
    styles: [
      {
        href: "/styles/ceatingUserDashboard.css",
        id: "ceatingUserDashboard", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },

  {
    pattern: "/appointment",
    loader: () => import("/js/views/appointment.js"),
    styles: [
      {
        href: "/styles/appointment.css",
        id: "appointment123", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },

  {
    pattern: "/users/:userId",
    loader: () => import("/js/views/userDashboard.js"),
  },
  {
    pattern: "/contact",
    loader: () => import("/js/views/contact.js"),
    styles: [
      {
        href: "/styles/contact.css",
        id: "contact123", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },
  {
    pattern: "/login",
    loader: () => import("/js/views/login.js"),
    styles: [
      {
        href: "/styles/login.css",
        id: "loginStyles", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },

  {
    pattern: "/register",
    loader: () => import("/js/views/register.js"),
    styles: [
      {
        href: "/styles/register.css",
        id: "register123", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
  },

  {
    pattern: "*",
    loader: () => import("/js/views/notFound.js"),
    styles: [
      {
        href: "/styles/notFound.css",
        id: "notFound123", //the name of the id doesn't matter, what's important is that it has to be unique
      },
    ],
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
    styles: fallback.styles || [],
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

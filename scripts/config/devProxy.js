module.exports = [
  {
    context: ["/api/v2/index/me", "/api/v2/login"],
    target: "< URI >", // todo
    secure: false,
    changeOrigin: true,
    headers: {
      token: "f61dfd93e48f358f69da1f1a93d95f4ff10753294c65bdca5fa9bad61a15f0a2",
      "X-Account-Id": 2,
    },
  },
  {
    context: [
      "/api/v1/admin/me",
      "/api/v1/admin/buildings",
      "/api/v1/admin/faculties",
      "/api/v1/admin/departments",
      "/api/v1/client/teachers",
      "/api/v1/admin/teachers",
      "/api/v1/admin/subjects",
      "/api/v1/admin/groups",
      "/api/v1/admin/schedules",
      "/api/v1/admin/schedule_settings",
      "/api/v1/admin/schedules_export",
      "/api/v1/admin/subject/search",
      "/api/v1/admin/teacher/search",
    ],
    target: "< URI >", // todo
    secure: false,
    changeOrigin: true,
    headers: {
      token: "f61dfd93e48f358f69da1f1a93d95f4ff10753294c65bdca5fa9bad61a15f0a2",
      "X-Account-Id": 2,
    },
  },
];

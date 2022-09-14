// sblum membuat router kita import dahulu
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "transaction.index",
    // component yaitu mengambil atau ke file index
    component: () => import("../views/transaction/Index.vue"),
  },
  {
    path: "/create",
    name: "transaction.create",
    // component yaitu mengambil atau ke file index
    component: () => import("../views/transaction/Create.vue"),
  },
  {
    path: "/edit/:id",
    name: "transaction.edit",
    // component yaitu mengambil atau ke file index
    component: () => import("../views/transaction/Edit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// sebelum di pakai kita harus export dahulu routernya
export default router;

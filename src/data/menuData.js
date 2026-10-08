import { appetizers } from "../pages/Appetizers";
import { entrees } from "../pages/Entrees";
import { mainCourses } from "../pages/MainCourses";
import { drinks } from "../pages/Drinks";
import { desserts } from "../pages/Desserts";

export const allMenuItems = [
  ...appetizers.map((item) => ({
    ...item,
    category: "Appetizers",
  })),

  ...entrees.map((item) => ({
    ...item,
    category: "Entrées",
  })),

  ...mainCourses.map((item) => ({
    ...item,
    category: "Main Courses",
  })),

  ...drinks.map((item) => ({
    ...item,
    category: "Drinks",
  })),

  ...desserts.map((item) => ({
    ...item,
    category: "Desserts",
  })),
];
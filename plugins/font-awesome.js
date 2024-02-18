import { defineNuxtPlugin } from "#app"; // remove if 'vue3' is recognised and global by default

import { library, config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faBookmark as fasBookmark,
  faUser as fasUser,
  faCompass as fasCompass,
  faPrint as fasPrint,
  faUserGroup as fasUserGroup,
  faSearch as fasSearch,
  faCircleInfo as fasCircleInfo,
  faPlus as fasPlus,
  faStar as fasStar,
  faArrowLeft as fasArrowLeft,
  faX as fasX,
  faThumbsUp as fasThumbsUp,
  faThumbsDown as fasThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

// This is important, we are going to let Nuxt not worry about the CSS
config.autoAddCss = true;

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
  fasBookmark,
  fasUser,
  fasCompass,
  fasPrint,
  fasUserGroup,
  fasSearch,
  fasCircleInfo,
  fasPlus,
  fasStar,
  fasArrowLeft,
  fasX,
  fasThumbsUp,
  fasThumbsDown
);

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("FontAwesomeIcon", FontAwesomeIcon);
});

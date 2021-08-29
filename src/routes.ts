import Home from "./components/home";
import Language from "./components/language";
import Rank from "./components/rank";
import Record from "./components/record";

const routes = [
  {
    path: "/tool",
    component: Home,
    title: "首页",
  },
  {
    path: "/tool/language",
    component: Language,
    title: "多语言快捷查询",
  },
  {
    path: "/tool/rank",
    component: Rank,
    title: "排行榜",
  },
  {
    path: "/tool/record",
    component: Record,
    title: "日报模板",
  },
];

export default routes;

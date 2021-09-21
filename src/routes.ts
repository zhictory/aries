import Fee from "./components/fee";
import Home from "./components/home";
import Language from "./components/language";
import Rank from "./components/rank";
import Record from "./components/record";

const routes = [
  {
    path: "/tool/home",
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
  {
    path: "/tool/fee",
    component: Fee,
    title: "个人理财",
  },
];

export default routes;

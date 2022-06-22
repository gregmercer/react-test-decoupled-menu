import TreeView from "@material-ui/lab/TreeView";
import TreeItem from "@material-ui/lab/TreeItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import util from "./menuHelper";
import "./App.css";

const MenuBar = ({ data }) => {
  const mainRoot = util(data);

  if (mainRoot.children.length === 0 || mainRoot.children === []) {
    return <div>&nbsp;</div>;
  }

  mainRoot.children = mainRoot.children.filter((item) => {
    if (item.href === "/programs") {
      return item;
    }
  });

  mainRoot.children = mainRoot.children[0].children.filter((item) => {
    if (item.href === "/programs/mba") {
      return item;
    }
  });

  mainRoot.children = mainRoot.children[0].children.filter((item) => {
    if (item.href !== "/programs/mba") {
      return item;
    }
  });

  return (
    <div className="horiz-menu">
      {/* Main root level - using single map */}
      <TreeView
        className="treeView"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {mainRoot.children.map((child) => {
          return createTreeItem(child);
        })}
      </TreeView>
    </div>
  );
};

// Inner roots level - using recursion
const createTreeItem = (menuObj) => {
  // Links for Leaf nodes
  if (menuObj.children.length === 0 || menuObj.children === []) {
    return (
      <TreeItem
        className="treeItem"
        key={menuObj["drupal-menu-hierarchy"][0]}
        nodeId={menuObj["drupal-menu-hierarchy"][0]}
        label={<a href={menuObj.href}>- {menuObj.title}</a>}
      ></TreeItem>
    );
  }
  // Recursing through sub-menus
  else
    return (
      <TreeItem
        key={menuObj["drupal-menu-hierarchy"][0]}
        nodeId={menuObj["drupal-menu-hierarchy"][0]}
        label={menuObj.title}
      >
        {menuObj.children.map((child) => createTreeItem(child))}
      </TreeItem>
    );
};

export default MenuBar;

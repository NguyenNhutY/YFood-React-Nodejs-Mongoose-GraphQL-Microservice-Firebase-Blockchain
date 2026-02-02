import React, { useMemo }  from "preact/hooks";
import { fromJS, List } from "immutable";
import ExploreMenuPresenter from "./ExploreMenuPresenter";
import { menu_list } from "../../assets/frontend_assets/assets";
import { FunctionalComponent } from "preact";

// Type for menu item
interface MenuItem {
  _id?: string;
  menu_name: string;
  menu_image: string;
}

// Define props interface
interface ExploreMenuContainerProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenuContainer: FunctionalComponent<ExploreMenuContainerProps> = ({
  category,
  setCategory,
}) => {
  // Convert menu_list to Immutable List with typed data
  const immutableMenuList: List<MenuItem> = fromJS(menu_list);

  // Memoize the transformed data to avoid unnecessary re-renders
  const menuItems = useMemo(() => immutableMenuList.toJS(), [
    immutableMenuList,
  ]);

  return (
    <ExploreMenuPresenter
      category={category}
      setCategory={setCategory}
      menuItems={menuItems}
    />
  );
};

export default ExploreMenuContainer;

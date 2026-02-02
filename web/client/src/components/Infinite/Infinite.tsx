import React  from "preact/hooks";
import "./infinite.scss";
import { FunctionalComponent } from "preact";

interface TagListProps {
  tags: string[];
  duration: string;
  direction: "normal" | "reverse";
}

const TagList: FunctionalComponent<TagListProps> = ({ tags, duration, direction }) => (
  <div
    class='loop-slider'
    style={
      {
        "--duration": duration,
        "--direction": direction,
      } as React.CSSProperties
    }
  >
    <div class='inner'>
      {tags.map((tag, index) => (
        <div class='tag' key={index}>
          {tag}
        </div>
      ))}
      {/* duplicated content */}
      {tags.map((tag, index) => (
        <div class='tag' key={`duplicate-${index}`}>
          {tag}
        </div>
      ))}
    </div>
  </div>
);

const InfiniteScrollAnimation: FunctionalComponent = () => (
  <div class='app'>
    <div class='tag-list'>
      <TagList
        tags={[
          "YFood",
          "Order",
          "Favourite",
          "Your Life",
          "Your Choose",
          "Salad",
          "Cake",
          "Pure Veg",
          "Pasta",
          "Noodles",
          "Your Days",
          "Your Foods",
        ]}
        duration='15951ms'
        direction='normal'
      />
      <TagList
        tags={[
          "Menu",
          "Display",
          "Dishes",
          "Rolls",
          "Sandwich",
          "Deserts",
          "Cheaper",
          "Yum",
          "Healthy",
          "Ascending",
          "Chicken",
          "Bread",
          "Promotion",
        ]}
        duration='19260ms'
        direction='reverse'
      />
    </div>
  </div>
);

export default InfiniteScrollAnimation;

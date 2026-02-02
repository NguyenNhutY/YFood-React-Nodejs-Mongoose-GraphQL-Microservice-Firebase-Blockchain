import "./animationFooter.scss";

const AnimatioFooter = () => {
  return (
    <div class='container'>
      <div class='coast'>
        <div class='wave-rel-wrap'>
          <div class='wave'></div>
        </div>
      </div>
      <div class='coast delay'>
        <div class='wave-rel-wrap'>
          <div class='wave delay'></div>
        </div>
      </div>

      <div class='text-wave text-wave-w'>w</div>
      <div class='text-wave text-wave-a'>a</div>
      <div class='text-wave text-wave-v'>v</div>
      <div class='text-wave text-wave-e'>e</div>
    </div>
  );
};

export default AnimatioFooter;

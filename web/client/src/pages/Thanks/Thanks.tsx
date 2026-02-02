
import "./thanks.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

const Thanks: FunctionalComponent = () => {
  const handleGoBack = () => {
    window.history.back(); // Quay lại trang trước
  };

  return (
    <>
      <button class='btn-back-history' onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
      </button>
      <div class='container  '>
        <h2>YFood - Cảm Ơn Quý Khách</h2>
        <p class=''>
          YFood xin gửi lời cảm ơn chân thành đến quý khách hàng đã lựa chọn và
          tin tưởng chúng tôi là đối tác trong hành trình khám phá ẩm thực của
          quý vị. Chúng tôi cam kết luôn nỗ lực để mang đến cho quý khách những
          trải nghiệm mua sắm tuyệt vời nhất, với sự đa dạng sản phẩm, chất
          lượng và dịch vụ chuyên nghiệp. Hãy tiếp tục đồng hành cùng YFood và
          khám phá thêm nhiều hương vị mới mỗi ngày!
        </p>
        {/* <video controls>
          <source src='D:\bt_html\Project_Part3\Food Delivery\frontend\src\assets\frontend_assets\LẶNG.mp4' />
        </video> */}

        <div id='qlogo'>
          <div class='poziomq'>
            <figure class='liscie'>
              <span class='lisc-lewy'>
                <span class='after'></span>
              </span>
              <span class='lisc-lewy drugi'>
                <span class='after'></span>
              </span>
              <span class='lisc-prawy'>
                <span class='after'></span>
              </span>
              <span class='lisc-prawy drugi'>
                <span class='after'></span>
              </span>
              <span class='lodyga'></span>
            </figure>
            <figure class='rece'>
              <span class='reka reka-lewa'></span>
              <span class='reka reka-prawa'></span>
            </figure>
            <figure class='cialo'>
              <span class='twarz'>
                <span class='oczy'>
                  <span class='oko oko-lewe'></span>
                  <span class='oko oko-prawe'></span>
                </span>
                <span class='piegi'>
                  <span class='pieg pieg-lewy'></span>
                  <span class='pieg pieg-prawy'></span>
                </span>
                <span class='buzia'>
                  <span class='gardlo'></span>
                  <span class='zuby'></span>
                </span>
              </span>
            </figure>
            <figure class='nogi'>
              <span class='noga-lewa'></span>
              <span class='noga-prawa'></span>
            </figure>
          </div>
          <figure class='cien'></figure>
          <figure class='tekst'>Hover Me!</figure>
        </div>
      </div>
    </>
  );
};

export default Thanks;

import React  from "preact/hooks";
import "./privacyPolicy.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

const PrivacyPolicy: FunctionalComponent = () => {
  const handleGoBack = () => {
    window.history.back(); // Quay lại trang trước
  };

  return (
    <>
      <button class='btn-back-history' onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
      </button>
      <div class=''>
        {" "}
        <header class='header-policy'>
          <h1>Chính sách bảo mật của YFood</h1>
        </header>
        <section class='section-policy'>
          <p>
            Chào mừng bạn đến với YFood! Chúng tôi cam kết bảo vệ thông tin cá
            nhân của bạn và tôn trọng quyền riêng tư của từng khách hàng. Chính
            sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ
            thông tin cá nhân của bạn khi bạn sử dụng dịch vụ của chúng tôi.
          </p>

          <h2>Thông tin chúng tôi thu thập</h2>
          <p>
            Khi bạn sử dụng YFood, chúng tôi có thể thu thập các thông tin sau
            từ bạn:
          </p>
          <ul>
            <li>
              Thông tin cá nhân: Bao gồm tên, địa chỉ email, số điện thoại và
              địa chỉ giao hàng.
            </li>
            <li>
              Thông tin tài khoản: Tài khoản và mật khẩu của bạn khi đăng ký tài
              khoản trên YFood.
            </li>
            <li>
              Thông tin giao dịch: Thông tin thanh toán và lịch sử giao dịch của
              bạn khi mua hàng trên YFood.
            </li>
            <li>
              Thông tin sử dụng: Dữ liệu về cách bạn tương tác và sử dụng dịch
              vụ của chúng tôi, bao gồm lịch sử truy cập, thao tác và sự tương
              tác với sản phẩm và dịch vụ của chúng tôi.
            </li>
          </ul>

          <p>
            Chúng tôi có thể tự động thu thập thông tin từ máy tính hoặc thiết
            bị di động của bạn, bao gồm địa chỉ IP, loại trình duyệt, ngôn ngữ
            truy cập, thời gian truy cập và các trang web mà bạn truy cập trước
            khi và sau khi bạn truy cập YFood.
          </p>

          <h2>Mục đích sử dụng thông tin</h2>
          <p>
            Chúng tôi sử dụng thông tin cá nhân của bạn cho các mục đích sau:
          </p>
          <ul>
            <li>
              Cung cấp dịch vụ: Để xử lý đơn hàng của bạn, cung cấp sản phẩm và
              dịch vụ bạn yêu cầu, bao gồm giao hàng và thanh toán.
            </li>
            <li>
              Cải thiện dịch vụ: Để cải thiện trải nghiệm của bạn khi sử dụng
              YFood, bao gồm tối ưu hóa giao diện và nâng cao chất lượng dịch
              vụ.
            </li>
            <li>
              Hỗ trợ khách hàng: Để hỗ trợ và giải quyết các yêu cầu, khiếu nại
              của khách hàng.
            </li>
            <li>
              Marketing và quảng cáo: Để gửi thông tin về sản phẩm, dịch vụ,
              chương trình khuyến mãi và các tin tức có liên quan từ YFood, nếu
              bạn đồng ý nhận thông tin này.
            </li>
          </ul>

          <h2>Chia sẻ thông tin</h2>
          <p>
            Chúng tôi không chia sẻ thông tin cá nhân của bạn với bất kỳ bên thứ
            ba nào ngoài những trường hợp sau:
          </p>
          <p>
            Chúng tôi không chia sẻ thông tin cá nhân của bạn với bất kỳ bên thứ
            ba nào ngoài những trường hợp sau:
          </p>
          <ul>
            <li>
              Nhà cung cấp dịch vụ: Chúng tôi có thể chia sẻ thông tin với các
              nhà cung cấp dịch vụ của chúng tôi để hỗ trợ hoạt động kinh doanh
              của chúng tôi, chẳng hạn như xử lý thanh toán, giao hàng hoặc phân
              tích dữ liệu.
            </li>
            <li>
              Tuân thủ pháp luật: Chúng tôi có thể tiết lộ thông tin cá nhân nếu
              cần thiết để tuân thủ các quy định pháp luật hoặc yêu cầu pháp lý.
            </li>
          </ul>

          <h2>Bảo mật thông tin</h2>
          <p>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi sử
            dụng các biện pháp an ninh vật lý, kỹ thuật và quản lý phù hợp để
            bảo vệ thông tin cá nhân của bạn khỏi mất mát, lạm dụng, truy cập
            trái phép, tiết lộ, sửa đổi hoặc phá hủy.
          </p>

          <h2>Quyền của bạn</h2>
          <p>
            Bạn có quyền yêu cầu truy cập, sửa đổi hoặc xóa thông tin cá nhân
            của mình bất kỳ lúc nào. Bạn cũng có quyền từ chối nhận các thông
            tin marketing từ chúng tôi bằng cách liên hệ với chúng tôi.
          </p>

          <h2>Liên hệ</h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi, ý kiến hoặc khiếu nại nào về chính sách
            bảo mật của chúng tôi hoặc cách chúng tôi xử lý thông tin cá nhân
            của bạn, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại
            được cung cấp trên trang web của chúng tôi.
          </p>

          <p>
            Chính sách bảo mật này có hiệu lực từ ngày được công bố và có thể
            được điều chỉnh theo thời gian mà không cần thông báo trước.
          </p>

          <h2>Kết Luận</h2>
          <p>
            YFood cam kết bảo vệ và tôn trọng quyền riêng tư của bạn. Chúng tôi
            luôn nỗ lực để cung cấp một môi trường mua sắm trực tuyến an toàn và
            tin cậy nhất cho khách hàng. Cảm ơn bạn đã tin tưởng và sử dụng dịch
            vụ của chúng tôi.
          </p>

          <p>
            Nếu bạn có bất kỳ câu hỏi nào khác hoặc cần thêm thông tin, vui lòng
            liên hệ với chúng tôi.
          </p>
          <br />
        </section>
        <footer class='footer-policy'>
          <p>YFood - Đơn giản hóa ẩm thực mỗi ngày!</p>
        </footer>
      </div>
    </>
  );
};

export default PrivacyPolicy;

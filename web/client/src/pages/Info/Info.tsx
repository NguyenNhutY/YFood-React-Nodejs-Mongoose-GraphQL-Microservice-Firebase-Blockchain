import React, { useState, useEffect, useRef, MouseEvent }  from "preact/hooks";
import "./info.scss";
import { assets } from "../../assets/frontend_assets/assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

// Define the type for product
interface Product {
  id: number;
  color: string;
  img: string;
  title: string;
  description: string;
}

const Info: FunctionalComponent = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const productsRef = useRef<HTMLDivElement[]>([]);
  const productContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Update the height of the products container
    const getProductHeight = () => {
      const activeProduct = productsRef.current[activeIndex];
      if (activeProduct && productContainerRef.current) {
        productContainerRef.current.style.height = `${activeProduct.clientHeight}px`;
      }
    };

    // Update the colors
    const animateContentColor = () => {
      const activeProduct = productsRef.current[activeIndex];
      if (activeProduct) {
        const productColor = activeProduct.getAttribute("product-color");

        const titleInfo = document.querySelector(".title-info") as HTMLElement;
        const btnInfo = document.querySelector(".btn-info") as HTMLElement;

        if (titleInfo && btnInfo) {
          titleInfo.style.color = productColor || "";
          btnInfo.style.color = productColor || "";
        }
      }
    };

    getProductHeight();
    animateContentColor();

    window.addEventListener("resize", getProductHeight);
    return () => {
      window.removeEventListener("resize", getProductHeight);
    };
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === productsRef.current.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? productsRef.current.length - 1 : prevIndex - 1
    );
  };

  const handleRippleClick = (
    e: MouseEvent<HTMLAnchorElement>,
    color: string
  ) => {
    const rippleDiv = document.createElement("div");
    rippleDiv.class = "ripple-info";
    const rippleSize = 60;
    const rippleOffset = e.currentTarget.getBoundingClientRect();
    const rippleY = e.clientY - rippleOffset.top;
    const rippleX = e.clientX - rippleOffset.left;
    rippleDiv.style.top = `${rippleY - rippleSize / 2}px`;
    rippleDiv.style.left = `${rippleX - rippleSize / 2}px`;
    rippleDiv.style.background = color;

    e.currentTarget.appendChild(rippleDiv);

    setTimeout(() => {
      rippleDiv.remove();
    }, 1900);
  };

  const handleGoBack = () => {
    // Handle go back logic
  };

  const products: Product[] = [
    {
      id: 1,
      color: "tomato",
      img: assets.food_8,
      title: "Đa Dạng Sản Phẩm",
      description:
        "YFood cung cấp một loạt các món ăn từ mọi thể loại, từ món ăn nhanh cho buổi trưa đến các món ăn đặc biệt cho bữa tiệc cuối tuần.",
    },
    {
      id: 2,
      color: "tomato",
      img: assets.food_1,
      title: "Giỏ Hàng Thông Minh",
      description:
        "Quản lý đơn hàng của bạn một cách hiệu quả với tính năng giỏ hàng linh hoạt, cho phép bạn xem và chỉnh sửa các món ăn trước khi đặt hàng.",
    },
    {
      id: 3,
      color: "tomato",
      img: assets.food_2,
      title: "Thanh Toán An Toàn",
      description:
        "Với các phương thức thanh toán an toàn và tiện lợi, bạn có thể hoàn thành đơn hàng một cách dễ dàng.",
    },
    {
      id: 4,
      color: "tomato",
      img: assets.food_3,
      title: "Cam Kết Chất Lượng",
      description:
        "Chúng tôi không chỉ đảm bảo sự tươi ngon, hương vị đích thực của mỗi món ăn mà còn đảm bảo an toàn vệ sinh thực phẩm và quy trình giao hàng chuyên nghiệp.",
    },
    {
      id: 5,
      color: "tomato",
      img: assets.food_4,
      title: "Trải Nghiệm Mua Sắm Tiện Lợi",
      description:
        "Với giao diện trực quan và dễ sử dụng, YFood mang đến cho bạn trải nghiệm mua sắm trực tuyến thú vị và thuận tiện nhất.",
    },
    {
      id: 6,
      color: "tomato",
      img: assets.food_5,
      title: "Dịch Vụ Khách Hàng Chuyên Nghiệp",
      description:
        "Đội ngũ dịch vụ khách hàng của chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, giúp giải đáp thắc mắc và giải quyết vấn đề nhanh chóng.",
    },
    {
      id: 7,
      color: "tomato",
      img: assets.food_6,
      title: "Kết Nối Với YFood",
      description:
        "Hãy tham gia cộng đồng YFood để cập nhật những ưu đãi hấp dẫn và thông tin mới nhất về các món ăn mới. Theo dõi chúng tôi trên mạng xã hội và đăng ký nhận bản tin để không bỏ lỡ bất kỳ điều gì!",
    },
    {
      id: 8,
      color: "tomato",
      img: assets.food_7,
      title: "Khám Phá và Thưởng Thức",
      description:
        "Duyệt qua YFood ngay hôm nay và khám phá thế giới ẩm thực đa dạng và phong phú tại ngón tay bạn. Hãy để YFood hướng dẫn bạn trên hành trình khám phá những hương vị tuyệt vời, mỗi ngày một món ăn mới!",
    },
  ];

  return (
    <>
      <button class='btn-back-history' onClick={handleGoBack}>
        <FontAwesomeIcon icon={faArrowUp} class='fontawe' />
      </button>
      <div class='card-info'>
        <div class='products-info' ref={productContainerRef}>
          {products.map((product, index) => (
            <div
              key={product.id}
              class={`product-info ${
                index === activeIndex ? "active" : ""
              }`}
              product-id={product.id}
              product-color={product.color}
              ref={(el) => (productsRef.current[index] = el as HTMLDivElement)}
            >
              <div class='thumbnail-info'>
                <img src={product.img} alt={product.title} />
              </div>
              <h1 class='title-info'>{product.title}</h1>
              <p class='description-info'>{product.description}</p>
            </div>
          ))}
        </div>
        <div class='footer-info'>
          <a
            class='btn-info'
            id='prev'
            href='#'
            ripple=''
            ripple-color='#666666'
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
              handleRippleClick(e as MouseEvent<HTMLAnchorElement>, "#666666");
            }}
          >
            Prev
          </a>
          <a
            class='btn-info'
            id='next'
            href='#'
            ripple=''
            ripple-color='#666666'
            onClick={(e) => {
              e.preventDefault();
              handleNext();
              handleRippleClick(e as MouseEvent<HTMLAnchorElement>, "#666666");
            }}
          >
            Next
          </a>
        </div>
      </div>
    </>
  );
};

export default Info;

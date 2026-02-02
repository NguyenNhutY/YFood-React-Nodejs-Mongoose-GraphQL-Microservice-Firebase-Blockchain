import React, { useState, useEffect, useMemo }  from "preact/hooks";
import { route } from "preact-router";
import quizData, { Question } from "../../types/quizData";
import "./quiz.scss";
import AdSlider from "../../components/AdSlider/AdSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FunctionalComponent } from "preact";

// Hàm trộn ngẫu nhiên mảng
const shuffleArray = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

// Tạo mã ngẫu nhiên
const generateRandomCode = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Lấy ngày hết hạn
const getExpiryDateISO = (days: number): string => {
  const now = new Date();
  now.setDate(now.getDate() + days);
  return now.toISOString();
};

// Hàm lưu mã khuyến mãi
const savePromoCode = (promoData: {
  code: string;
  discount: number;
  description: string;
  expiryDate: string;
}) => {
  const existingPromoCodes = JSON.parse(
    localStorage.getItem("promoCodes") || "[]"
  );
  existingPromoCodes.push(promoData);
  localStorage.setItem("promoCodes", JSON.stringify(existingPromoCodes));
};

const Quiz: FunctionalComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [copyStatus, setCopyStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const shuffledQuizData = shuffleArray([...quizData]).slice(0, 5);
    setShuffledQuestions(shuffledQuizData);
  }, []);

  const promo = useMemo(() => {
    if (completed) {
      const discount = Math.min(10, Math.max(2, score));
      const code = generateRandomCode(10);
      const description = `Discount of ${discount}%`;
      const expiryDate = getExpiryDateISO(1);

      // Tạo đối tượng JSON chứa thông tin mã khuyến mãi
      const promoData = { code, discount, description, expiryDate };

      // Lưu thông tin mã khuyến mãi vào local storage
      savePromoCode(promoData);

      return promoData;
    }
  }, [completed, score]);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 2);
    }
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleCopyPromoCode = () => {
    if (promo?.code) {
      navigator.clipboard
        .writeText(promo.code)
        .then(() => {
          setCopyStatus("Đã copied!");
        })
        .catch(() => {
          setCopyStatus("Failed to copy");
        });
    }
  };

  const goToCart = () => {
    navigate("/cart");
  };

  if (!shuffledQuestions.length) {
    return <p class='quiz__loading'>Loading...</p>;
  }

  const question: Question | undefined =
    shuffledQuestions[currentQuestionIndex];

  return (
    <>
      <div>
        {" "}
        <button
          class='btn-back-history'
          onClick={() => window.history.back()}
        >
          <FontAwesomeIcon icon={faArrowUp} className='fontawe' />
        </button>
      </div>
      <div class='quiz'>
        {!completed ? (
          <div class='quiz__question-container'>
            <h2 class='quiz__question-text'>{question?.text}</h2>
            <div class='quiz__options'>
              {shuffleArray(question?.options || []).map((option, index) => (
                <button
                  key={index}
                  class='quiz__option'
                  onClick={() => handleAnswer(option.isCorrect)}
                >
                  {option.answer}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div class='quiz__completion'>
            <h2 class='quiz__completion-text'>
              Completed! You scored {score} points.
            </h2>
            {promo && (
              <div class='quiz__promo'>
                <p
                  class='quiz__promo-code'
                  onClick={handleCopyPromoCode}
                  style={{ cursor: "pointer" }}
                >
                  Your promo code is: <span>{promo.code}</span>
                </p>
                {copyStatus && (
                  <p class='quiz__copy-status'>{copyStatus}</p>
                )}
                <p class='quiz__promo-discount'>
                  Discount rate: {promo.discount}%
                </p>
                <p class='quiz__promo-expiry'>
                  Expiry date: {new Date(promo.expiryDate).toLocaleDateString()}
                </p>
                <button class='quiz__goto-cart' onClick={goToCart}>
                  Go to Cart
                </button>
              </div>
            )}
          </div>
        )}
      </div>{" "}
      <AdSlider />
    </>
  );
};

export default Quiz;

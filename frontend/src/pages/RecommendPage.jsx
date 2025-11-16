import React, { useState, useEffect } from "react";

export default function Recommendation() {
  const [userId, setUserId] = useState(null);
  const [loginLoading, setLoginLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fakeEmoji, setFakeEmoji] = useState(null);

  const emojiList = [
    "🍣",
    "🍚",
    "🥟",
    "🍜",
    "🍝",
    "🍕",
    "🥗",
    "🥡",
    "🍛",
    "🍤",
    "🌮",
    "🍗",
  ];

  const categories = [
    { id: 1, name: "한식" },
    { id: 2, name: "중식" },
    { id: 3, name: "양식" },
    { id: 4, name: "일식" },
    { id: 5, name: "디저트" },
  ];

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/check", {
          credentials: "include",
        });
        const data = await res.json();

        const userIdFromSession = data?.user?.user_id;
        if (data.loggedIn && userIdFromSession) {
          setUserId(userIdFromSession);
        } else {
          setUserId(null);
        }
      } catch (err) {
        console.error("로그인 확인 실패:", err);
        setUserId(null);
      } finally {
        setLoginLoading(false);
      }
    };
    checkLogin();
  }, []);

  const handleRandom = async () => {
    setSelectedCategory(null);
    setLoading(true);
    setResult(null);
    setFakeEmoji("🤔");

    const emojiInterval = setInterval(() => {
      const randomEmoji =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      setFakeEmoji(randomEmoji);
    }, 100);

    const baseUrl = "http://localhost:5000";
    const endpoint = userId
      ? `${baseUrl}/api/random/login?userId=${userId}`
      : `${baseUrl}/api/random`; // 비회원용 기본 랜덤

    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      setTimeout(() => {
        clearInterval(emojiInterval);
        setFakeEmoji(null);
        setResult(data.recommendedFood || null);
        setLoading(false);
      }, 1200);
    } catch (err) {
      clearInterval(emojiInterval);
      setFakeEmoji(null);
      setLoading(false);
      alert("랜덤 추천 중 오류 발생");
    }
  };

  const handleRecommend = async (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    setResult(null);
    setFakeEmoji("🤔");

    const emojiInterval = setInterval(() => {
      const randomEmoji =
        emojiList[Math.floor(Math.random() * emojiList.length)];
      setFakeEmoji(randomEmoji);
    }, 100);

    const baseUrl = "http://localhost:5000";
    const endpoint = userId
      ? `${baseUrl}/member/category/recommend?categoryId=${categoryId}&userId=${userId}`
      : `${baseUrl}/guest/category/recommend?categoryId=${categoryId}`;

    try {
      const res = await fetch(endpoint);
      const data = await res.json();

      setTimeout(() => {
        clearInterval(emojiInterval);
        setFakeEmoji(null);
        setResult(data.recommendedFood || null);
        setLoading(false);
      }, 1200);
    } catch (err) {
      clearInterval(emojiInterval);
      setFakeEmoji(null);
      setLoading(false);
      alert("추천 요청 중 오류 발생");
    }
  };

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      @keyframes pop {
        0% { transform: scale(1); }
        50% { transform: scale(0.9); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  const getCategoryEmoji = (category) => {
    switch (category) {
      case "한식":
        return "🍚";
      case "중식":
        return "🥡";
      case "일식":
        return "🍣";
      case "양식":
        return "🍝";
      case "디저트":
        return "🍰";
      default:
        return "🍽";
    }
  };

  if (loginLoading) {
    return (
      <div style={styles.container}>
        <p style={styles.loading}>⏳ 로그인 상태 확인 중...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.userInfo}>
        {userId ? (
          <p>
            🙍‍♂️ <strong>{userId}님</strong>
          </p>
        ) : (
          <p>🙍 게스트 모드</p>
        )}
      </div>

      <h1 style={styles.title}> 오늘의 메뉴 추천</h1>
      <p style={styles.subtitle}>먹고 싶은 메뉴를 선택해보세요!</p>

      <div style={styles.buttonContainer}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleRecommend(cat.id)}
            disabled={loading}
            style={{
              ...styles.categoryButton,
              ...(selectedCategory === cat.id
                ? styles.categoryButtonSelected
                : {}),
              ...(loading ? styles.categoryButtonDisabled : {}),
            }}
          >
            {getCategoryEmoji(cat.name)} {cat.name}
          </button>
        ))}
        <button
          onClick={handleRandom}
          disabled={loading}
          style={{
            ...styles.categoryButton,
            ...(loading ? styles.categoryButtonDisabled : {}),
          }}
        >
          🍽️ 아무거나!
        </button>
      </div>

      {loading && (
        <p style={styles.loading}>
          <span style={{ fontSize: "36px" }}>{fakeEmoji}</span>
        </p>
      )}

      {!loading && result && result.food_name && (
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}> 오늘의 추천 메뉴 </h2>
          <p style={styles.resultFood}>{result.food_name}</p>
          <p style={styles.resultCategory}>({result.category_name})</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "640px",
    margin: "80px auto",
    padding: "40px 24px",
    fontFamily: "'Noto Sans KR', sans-serif",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 12px 24px rgba(0, 0, 0, 0.06)",
    color: "#222",
  },
  userInfo: {
    textAlign: "right",
    fontSize: "13px",
    color: "#777",
    marginBottom: "10px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "8px",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "15px",
    color: "#666",
    marginBottom: "30px",
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "14px",
    marginBottom: "36px",
  },
  categoryButton: {
    padding: "12px 24px",
    borderRadius: "30px",
    border: "1px solid #ddd",
    backgroundColor: "#f0f0f0",
    color: "#333",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  categoryButtonSelected: {
    backgroundColor: "#4c6ef5",
    color: "#fff",
    border: "1px solid #4c6ef5",
    boxShadow: "0 4px 12px rgba(76, 110, 245, 0.3)",
    animation: "pop 0.2s ease",
  },
  categoryButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  loading: {
    textAlign: "center",
    fontSize: "15px",
    color: "#888",
  },
  resultCard: {
    backgroundColor: "#f4f8ff",
    padding: "32px 24px",
    borderRadius: "24px",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    maxWidth: "400px",
    margin: "0 auto",
  },
  resultTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
    color: "#2d3a58",
  },
  resultFood: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#000",
  },
  resultCategory: {
    fontSize: "16px",
    color: "#666",
  },
};

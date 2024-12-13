import { useState, useEffect, useRef } from "react";
import { getQuotes, formatCreatedAt } from "../utils/utils.app";
import Navbar from "./Navbar";
import CreateQuotePage from "./CreateQuotePage";
import "./Styles/QuoteListPage.css";
import profile from "../Assets/profile.png";

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem("token");
  const observerRef = useRef(null);

  const fetchQuotes = async (reset = false) => {
    try {
      const newOffset = reset ? 0 : offset;
      const response = await getQuotes(token, 5, newOffset);
      if (reset) {
        setQuotes(response.data.data); // Replace with fresh data
        setOffset(5); // Reset offset
        setHasMore(response.data.data.length > 0);
      } else {
        if (response.data.data.length === 0) {
          setHasMore(false);
        } else {
          setQuotes((prevQuotes) => [...prevQuotes, ...response.data.data]);
          setOffset((prevOffset) => prevOffset + 5);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore) {
            fetchQuotes();
          }
        },
        { threshold: 1.0 }
      );
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [hasMore, quotes]);

  return (
    <div className="quote-container">
      <Navbar />
      <div className="quote-list-page">
        <header className="quote-header">
          <CreateQuotePage onPostCreated={() => fetchQuotes(true)} />
        </header>
        <div className="quote-grid">
          {quotes.map((quote, index) => (
            <div className="quote-card" key={`${quote.id}_${index}`}>
              <div className="quote-details">
                <img className="avatar" src={profile} alt="user icon" />
                <div className="quote-username">
                  {quote.username}
                  <div className="quote-date">
                    {formatCreatedAt(quote.createdAt)}
                  </div>
                </div>
                <i className="fa-solid fa-ellipsis"></i>
                <span className="quote-more-action">...</span>
              </div>
              <div className="quote-image">
                <div className="quote-text-overlay">{quote.text}</div>
                <img src={quote.mediaUrl} alt="quote" />
              </div>
              <div className="quote-actions">
                <button className="quote-action-button">Like</button>
                <i className="fa-regular fa-comment"></i>
                <button className="quote-action-button">Comment</button>
                <button className="quote-action-button">Repost</button>
                <button className="quote-action-button">Send</button>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div ref={observerRef} className="loading-indicator">
            Loading more...
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteListPage;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const CountdownTimer = ({ expiryDate }) => {
  const calcTimeLeft = () => {
    const diff = new Date(expiryDate) - new Date();
    if (diff <= 0) return null;
    return {
      h: Math.floor((diff / 3600000) % 24),
      m: Math.floor((diff / 60000) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000); // eslint-disable-line react-hooks/exhaustive-deps
    return () => clearInterval(timer);
  }, [expiryDate]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!timeLeft) return null;
  return (
    <div className="de_countdown">
      {String(timeLeft.h).padStart(2, "0")}h{" "}
      {String(timeLeft.m).padStart(2, "0")}m{" "}
      {String(timeLeft.s).padStart(2, "0")}s
    </div>
  );
};

const SkeletonCard = () => (
  <div className="nft__item">
    <div className="author_list_pp">
      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#ddd" }} />
    </div>
    <div style={{ width: 80, height: 20, background: "#ddd", borderRadius: 4, margin: "10px 0" }} />
    <div className="nft__item_wrap">
      <div style={{ width: "100%", height: 200, background: "#ddd", borderRadius: 8 }} />
    </div>
    <div className="nft__item_info">
      <div style={{ width: 120, height: 16, background: "#ddd", borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: 70, height: 14, background: "#ddd", borderRadius: 4 }} />
    </div>
  </div>
);

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const carouselItems = loading
    ? new Array(4).fill(0).map((_, i) => (
        <div className="item" key={i} style={{ padding: "0 10px" }}>
          <SkeletonCard />
        </div>
      ))
    : items.map((item) => (
        <div className="item" key={item.id} style={{ padding: "0 10px" }}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title={`Creator: ${item.authorName}`}
              >
                <img className="lazy" src={item.authorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>

            {item.expiryDate && <CountdownTimer expiryDate={item.expiryDate} />}

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href={`mailto:?subject=${item.title}`}>
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>

            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ));

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <AliceCarousel
              mouseTracking
              infinite
              autoPlayInterval={1000}
              animationDuration={1500}
              disableDotsControls
              disableButtonsControls
              responsive={responsive}
              autoPlay
              items={carouselItems}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;

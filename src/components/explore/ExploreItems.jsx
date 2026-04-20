import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ display: "block" }}>
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
  </div>
);

const ExploreItems = () => {
  const [allItems, setAllItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = filter
      ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`
      : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

    axios
      .get(url)
      .then((res) => {
        setAllItems(res.data);
        setVisible(8);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  const displayed = allItems.slice(0, visible);

  return (
    <>
      <div>
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? new Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
        : displayed.map((item) => (
            <div
              key={item.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author?authorId=${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={item.authorName}
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
                  <Link to={`/item-details?nftId=${item.nftId}`}>
                    <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
                  </Link>
                </div>

                <div className="nft__item_info">
                  <Link to={`/item-details?nftId=${item.nftId}`}>
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
          ))}

      {!loading && visible < allItems.length && (
        <div className="col-md-12 text-center">
          <button
            onClick={() => setVisible((prev) => prev + 4)}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;

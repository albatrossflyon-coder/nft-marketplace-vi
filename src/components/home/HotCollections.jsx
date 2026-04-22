import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";

const SkeletonCard = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <div
        className="lazy img-fluid"
        style={{
          background: "#ddd",
          width: "100%",
          height: "200px",
          borderRadius: "8px",
        }}
      />
    </div>
    <div className="nft_coll_pp">
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#ddd",
        }}
      />
    </div>
    <div className="nft_coll_info">
      <div
        style={{
          width: "80px",
          height: "16px",
          background: "#ddd",
          borderRadius: "4px",
          marginBottom: "6px",
        }}
      />
      <div
        style={{
          width: "50px",
          height: "12px",
          background: "#ddd",
          borderRadius: "4px",
        }}
      />
    </div>
  </div>
);

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections")
      .then((res) => {
        setCollections(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const items = loading
    ? new Array(4).fill(0).map((_, i) => (
        <div className="item" key={i} style={{ padding: "0 10px" }}>
          <SkeletonCard />
        </div>
      ))
    : collections.map((item) => (
        <div className="item" key={item.id} style={{ padding: "0 10px" }}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details?nftId=${item.nftId}`}>
                <img src={item.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author?authorId=${item.authorId}`}>
                <img className="lazy pp-coll" src={item.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{item.title}</h4>
              </Link>
              <span>ERC-{item.code}</span>
            </div>
          </div>
        </div>
      ));

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
              items={items}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;

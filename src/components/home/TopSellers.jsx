import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SkeletonRow = () => (
  <li>
    <div className="author_list_pp">
      <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#ddd" }} />
    </div>
    <div className="author_list_info">
      <div style={{ width: 100, height: 14, background: "#ddd", borderRadius: 4, marginBottom: 6 }} />
      <div style={{ width: 60, height: 12, background: "#ddd", borderRadius: 4 }} />
    </div>
  </li>
);

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => {
        setSellers(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade-up" data-aos-delay="100">
            <ol className="author_list">
              {loading
                ? new Array(12).fill(0).map((_, i) => <SkeletonRow key={i} />)
                : sellers.map((seller) => (
                    <li key={seller.id}>
                      <div className="author_list_pp">
                        <Link to={`/author?authorId=${seller.authorId}`}>
                          <img className="lazy pp-author" src={seller.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author?authorId=${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

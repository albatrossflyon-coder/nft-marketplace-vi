import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton width="100%" height="350px" borderRadius="10px" />
                ) : (
                  <img
                    src={nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <>
                      <Skeleton width="80%" height="30px" borderRadius="4px" />
                      <div className="item_info_counts" style={{ marginTop: "16px" }}>
                        <Skeleton width="60px" height="20px" borderRadius="4px" />
                        <Skeleton width="60px" height="20px" borderRadius="4px" style={{ marginLeft: "10px" }} />
                      </div>
                      <div style={{ marginTop: "16px" }}>
                        <Skeleton width="100%" height="14px" borderRadius="4px" />
                        <Skeleton width="90%" height="14px" borderRadius="4px" style={{ marginTop: "8px" }} />
                        <Skeleton width="80%" height="14px" borderRadius="4px" style={{ marginTop: "8px" }} />
                      </div>
                      <div className="d-flex flex-row" style={{ marginTop: "24px" }}>
                        <div className="mr40">
                          <Skeleton width="50px" height="14px" borderRadius="4px" />
                          <div className="item_author" style={{ marginTop: "8px" }}>
                            <div className="author_list_pp">
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                            </div>
                            <div className="author_list_info" style={{ marginLeft: "60px" }}>
                              <Skeleton width="100px" height="14px" borderRadius="4px" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="de_tab tab_simple" style={{ marginTop: "24px" }}>
                        <div className="de_tab_content">
                          <Skeleton width="60px" height="14px" borderRadius="4px" />
                          <div className="item_author" style={{ marginTop: "8px" }}>
                            <div className="author_list_pp">
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                            </div>
                            <div className="author_list_info" style={{ marginLeft: "60px" }}>
                              <Skeleton width="100px" height="14px" borderRadius="4px" />
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <Skeleton width="50px" height="14px" borderRadius="4px" />
                        <div style={{ marginTop: "8px" }}>
                          <Skeleton width="120px" height="30px" borderRadius="4px" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2>Rainbow Style #194</h2>
                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          100
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          74
                        </div>
                      </div>
                      <p>
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                        illo inventore veritatis et quasi architecto beatae vitae
                        dicta sunt explicabo.
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">Monica Lucas</Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to="/author">
                                <img className="lazy" src={AuthorImage} alt="" />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to="/author">Monica Lucas</Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>1.85</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;

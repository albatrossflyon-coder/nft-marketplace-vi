import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import EthImage from "../images/ethereum.svg";

const Skeleton = ({ w, h, circle }) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: circle ? "50%" : 4,
      background: "#ddd",
      marginBottom: 8,
    }}
  />
);

const ItemDetails = () => {
  const { search } = useLocation();
  const nftId = new URLSearchParams(search).get("nftId");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!nftId) {
      setLoading(false);
      return;
    }
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      )
      .then((res) => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <Skeleton w="100%" h={400} />
                ) : (
                  <img
                    src={item?.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                )}
              </div>

              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <Skeleton w={240} h={32} />
                  ) : (
                    <h2>{item?.title}</h2>
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {loading ? "..." : item?.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {loading ? "..." : item?.likes}
                    </div>
                  </div>

                  {loading ? (
                    <Skeleton w="90%" h={60} />
                  ) : (
                    <p>{item?.description}</p>
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton w={50} h={50} circle />
                          ) : (
                            <Link to={`/author?authorId=${item?.ownerId}`}>
                              <img className="lazy" src={item?.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton w={100} h={14} />
                          ) : (
                            <Link to={`/author?authorId=${item?.ownerId}`}>
                              {item?.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {loading ? (
                            <Skeleton w={50} h={50} circle />
                          ) : (
                            <Link to={`/author?authorId=${item?.creatorId}`}>
                              <img className="lazy" src={item?.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          )}
                        </div>
                        <div className="author_list_info">
                          {loading ? (
                            <Skeleton w={100} h={14} />
                          ) : (
                            <Link to={`/author?authorId=${item?.creatorId}`}>
                              {item?.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      {loading ? (
                        <Skeleton w={60} h={20} />
                      ) : (
                        <span>{item?.price}</span>
                      )}
                    </div>
                  </div>
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

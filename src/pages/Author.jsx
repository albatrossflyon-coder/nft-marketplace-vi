import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const Author = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState(false);
  const [searchParams] = useSearchParams();
  const authorId = searchParams.get("authorId");

  useEffect(() => {
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authorId]);

  const handleFollow = () => setFollowed((prev) => !prev);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton width="150px" height="150px" borderRadius="50%" />
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}

                      {!loading && <i className="fa fa-check"></i>}

                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <>
                              <Skeleton width="160px" height="22px" borderRadius="4px" />
                              <span className="profile_username">
                                <Skeleton width="100px" height="16px" borderRadius="4px" style={{ marginTop: "6px" }} />
                              </span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width="260px" height="14px" borderRadius="4px" style={{ marginTop: "6px" }} />
                              </span>
                            </>
                          ) : (
                            <>
                              {author?.authorName}
                              <span className="profile_username">{author?.tag}</span>
                              <span id="wallet" className="profile_wallet">
                                {author?.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <Skeleton width="80px" height="16px" borderRadius="4px" />
                          <Skeleton width="100px" height="36px" borderRadius="4px" style={{ marginTop: "10px" }} />
                        </>
                      ) : (
                        <>
                          <div className="profile_follower">
                            {followed ? author?.followers + 1 : author?.followers} followers
                          </div>
                          <button onClick={handleFollow} className="btn-main">
                            {followed ? "Unfollow" : "Follow"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    loading={loading}
                    nftCollection={author?.nftCollection}
                    authorId={author?.authorId}
                    authorImage={author?.authorImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;

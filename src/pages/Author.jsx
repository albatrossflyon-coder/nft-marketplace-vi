import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";

const Author = () => {
  const { search } = useLocation();
  const authorId = new URLSearchParams(search).get("authorId");

  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!authorId) {
      setLoading(false);
      return;
    }
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/author?author=${authorId}`
      )
      .then((res) => {
        setAuthor(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authorId]);

  const handleFollow = () => setFollowing((prev) => !prev);

  const followers = author
    ? following
      ? author.followers + 1
      : author.followers
    : 0;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
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
                        <div
                          style={{
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            background: "#ddd",
                          }}
                        />
                      ) : (
                        <img src={author?.authorImage} alt="" />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <div
                              style={{
                                width: 160,
                                height: 20,
                                background: "#ddd",
                                borderRadius: 4,
                              }}
                            />
                          ) : (
                            author?.authorName
                          )}
                          <span className="profile_username">
                            {loading ? "" : `@${author?.tag}`}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? "" : author?.address}
                          </span>
                          {!loading && (
                            <button
                              id="btn_copy"
                              title="Copy Text"
                              onClick={() =>
                                navigator.clipboard.writeText(author?.address || "")
                              }
                            >
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? "..." : `${followers} followers`}
                      </div>
                      <button
                        className="btn-main"
                        onClick={handleFollow}
                      >
                        {following ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
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

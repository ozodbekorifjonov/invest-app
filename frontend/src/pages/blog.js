import React, { useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRecommends } from '../store/recommend-provider';
import Loader from '../UI/Loader';
import Markdown from '../UI/Markdown';

function Blog() {
  const { isLoading, postList, getPostList } = useRecommends();

  useEffect(() => {
    getPostList();
  }, [getPostList]);

  return (
    <div>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div className="col-10 offset-1">
            <h4>Posts</h4>
            {isLoading && <Loader />}
            {!isLoading &&
              postList.map((item, i) => (
                <div key={i}>
                  <h3>{item.title}</h3>
                  <Markdown value={item?.content} />
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Blog;

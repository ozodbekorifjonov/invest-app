import React, { useEffect } from 'react';
import { useRecommends } from '../../../store/recommend-provider';
import { deletePostAPI } from '../../../api/investApi';
import { toast } from 'react-toastify';
import Loader from '../../../UI/Loader';
import Markdown from '../../../UI/Markdown';
import { PATH_ADMIN_POST_CREATE } from '../../../consts';
import { Link } from 'react-router-dom';

function Posts() {
  const { isLoading, postList, getPostList } = useRecommends();

  useEffect(() => {
    getPostList();
  }, [getPostList]);

  const deleteItem = async (id) => {
    try {
      const res = await deletePostAPI(id);
      toast.success(res.data.message);
      getPostList();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Posts</h5>
        <Link
          to={PATH_ADMIN_POST_CREATE}
          className="app-form-button-sm app-button-success mb-2 text-decoration-none d-inline-block text-black"
        >
          Add new post
        </Link>

        {isLoading && <Loader />}
        {!isLoading &&
          postList.map((item, i) => (
            <div key={i}>
              <h3>{item.title}</h3>
              <Markdown value={item?.content} />
              <div className="d-flex justify-content-end">
                <Link
                  to={`${PATH_ADMIN_POST_CREATE}?id=${item.id}`}
                  className="app-form-button-sm app-button-primary text-decoration-none text-white me-3"
                >
                  Edit
                </Link>
                <button
                  className="app-form-button-sm app-button-danger"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Posts;

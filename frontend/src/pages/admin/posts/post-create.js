import React, { useState } from 'react';
import TextEditor from '../../../helper/textEditor';
import { createPostAPI, postDetailsAPI, updatePostAPI } from '../../../api/investApi';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { PATH_ADMIN_POSTS } from '../../../consts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAsyncLoader from '../../../hooks/useAsyncLoader';

const TextEditorStyle = styled.div`
  height: 25rem;
  position: relative;
  margin-bottom: 50px;

  .editor-input {
    height: 100%;
  }
`;

function PostCreate() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const { isLoading, data } = useAsyncLoader(postDetailsAPI, id);
  const postDetails = data?.data?.data;

  const [itemTitle, setItemTitle] = useState('');
  const [itemContent, setItemContent] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;

    if (id) {
      try {
        response = await updatePostAPI(id, itemTitle, itemContent);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        response = await createPostAPI(itemTitle, itemContent);
      } catch (error) {
        toast.error(error.message);
      }
    }

    if (response.data.success) {
      navigate(PATH_ADMIN_POSTS);
      toast.success(response.data.message);
    }

    setItemTitle('');
    setItemContent('');
  };

  const getContentValue = (val) => setItemContent(val);

  return (
    <div className="row">
      <div className="col-10 offset-1">
        <h5>Add new post</h5>
        <form onSubmit={handleSubmit}>
          <div className="app-form-control">
            <input
              defaultValue={postDetails?.title}
              onChange={(e) => setItemTitle(e.target.value)}
              name="title"
              type="text"
              placeholder="Title"
              required={true}
            />
          </div>
          <div className="app-form-control">
            <TextEditorStyle>
              <TextEditor
                getContentValue={getContentValue}
                className="editor-input"
                content={itemContent}
                defaultValue={postDetails?.content}
                required={true}
              />
            </TextEditorStyle>
          </div>
          <div className="d-flex justify-content-end">
            <button className="app-form-button-sm app-button-success mx-2">Add post</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostCreate;

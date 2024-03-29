import React, { useState } from 'react';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image', 'video'],
  ],
};

function TextEditor(props) {
  const { getContentValue, className, defaultValue } = props;

  return (
    <ReactQuill
      theme="snow"
      className={className}
      placeholder="Content"
      onChange={getContentValue}
      modules={modules}
      defaultValue={defaultValue}
    />
  );
}

export default TextEditor;

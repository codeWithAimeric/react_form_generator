import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const TextEditor = ({ field, value, onChangeFunction }) => {
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const handleChange = (value) => {
    onChangeFunction(value, field.name);
  }

  return (
    <div>
      <label className={field.classes?.label} htmlFor={field.name}>{field.label}</label>
      <ReactQuill
          value={value}
          onChange={handleChange}
          modules={modules}
          formats={formats}
      />
    </div>
  );
};

  
  export default TextEditor;
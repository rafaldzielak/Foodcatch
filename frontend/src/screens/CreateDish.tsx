import React, { useState } from "react";
import "./CreateDish.scss";

const CreateDish = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  // const [isVege, setIsVege] = useState(false);
  // const [isSpicy, setIsSpicy] = useState(false);
  // const [type, setType] = useState("");

  const showFormInput = () => (
    <>
      <div className=''>
        <div className=''>
          <div className='ls-1 fs-2'>Name</div>
          <input type='text' className='name' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className=''>
          <div className='ls-1 fs-2'>Price</div>
          <input
            type='number'
            className='phone'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className='description'>
          <div className='ls-1 fs-2'>Description</div>
          <input
            type='text'
            className='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='imgURL'>
          <div className='ls-1 fs-2'>Image URL</div>
          <input type='text' className='imgURL' value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
        </div>
      </div>
      <hr />
    </>
  );

  return (
    <div className='container'>
      <h1 className='ls-1'>Add dish</h1>
      {showFormInput()}
      <button>Add dish</button>
    </div>
  );
};

export default CreateDish;

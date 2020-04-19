import React from 'react';
import { Rate } from 'antd';
import Rating from '../../../Rating';

const PartialReview = () => (
  <div className="row">
    <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
      <div className="ps-block--average-rating">
        <div className="ps-block__header">
          <h3>4.00</h3>
          <Rating />

          <span>1 Review</span>
        </div>
        <div className="ps-block__star">
          <span>5 Star</span>
          <div className="ps-progress" data-value="100">
            <span />
          </div>
          <span>100%</span>
        </div>
        <div className="ps-block__star">
          <span>4 Star</span>
          <div className="ps-progress" data-value="0">
            <span />
          </div>
          <span>0</span>
        </div>
        <div className="ps-block__star">
          <span>3 Star</span>
          <div className="ps-progress" data-value="0">
            <span />
          </div>
          <span>0</span>
        </div>
        <div className="ps-block__star">
          <span>2 Star</span>
          <div className="ps-progress" data-value="0">
            <span />
          </div>
          <span>0</span>
        </div>
        <div className="ps-block__star">
          <span>1 Star</span>
          <div className="ps-progress" data-value="0">
            <span />
          </div>
          <span>0</span>
        </div>
      </div>
    </div>
    <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12 ">
      <div className="ps-form--review">
        <h4>Submit Your Review</h4>
        <p> Your email address will not be published. Required fields are marked <sup>*</sup> </p>
        <div className="form-group form-group__rating">
          <label>Your rating of this product</label>
          <Rate defaultValue={1} />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            rows="6"
            placeholder="Write your review here"
          />
        </div>
        <button
          type="button"
          className="ps-btn btn btn-default"
        >Submit Review
        </button>
      </div>
    </div>
  </div>
);

export default PartialReview;

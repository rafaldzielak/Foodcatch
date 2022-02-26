import { gql } from "@apollo/client";

export const getCouponsQuery = gql`
  query GetCoupons {
    getCoupons {
      coupons {
        couponName
        validUntil
        percentage
      }
      count
    }
  }
`;

export const createCouponMutation = gql`
  mutation CreateCoupon($couponName: String!, $validUntil: String!, $percentage: Int!) {
    createCoupon(couponName: $couponName, validUntil: $validUntil, percentage: $percentage) {
      percentage
      couponName
      validUntil
    }
  }
`;

export const removeCouponMutation = gql`
  mutation RemoveCoupon($couponName: String!) {
    removeCoupon(couponName: $couponName) {
      couponName
      validUntil
      percentage
    }
  }
`;

export const editCouponMutation = gql`
  mutation EditCoupon($couponName: String!, $validUntil: String, $percentage: Int) {
    editCoupon(couponName: $couponName, validUntil: $validUntil, percentage: $percentage) {
      percentage
      couponName
      validUntil
    }
  }
`;

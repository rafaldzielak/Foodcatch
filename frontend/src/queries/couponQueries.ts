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

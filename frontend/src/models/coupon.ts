export interface Coupon {
  couponApplied: string;
  couponAppliedPercentage: number;
}

export interface CouponFromDB {
  couponName: string;
  validUntil: string;
  percentage: number;
}

export interface CouponResponse {
  coupons: CouponFromDB[];
  count: number;
  page: number;
  allPages: number;
}

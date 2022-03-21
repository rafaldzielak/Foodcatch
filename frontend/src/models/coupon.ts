export interface Coupon {
  couponName: string;
  percentage: number;
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

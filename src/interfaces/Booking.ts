export interface Booking {
    bookingID?: string;
    checkin: Date;
    checkout: Date;
    totalPrice: number;
    listingID: string;
}
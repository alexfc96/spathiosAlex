export interface Space {
    listingid?: string;
    listingname: string;
    priceperhour: number;
    listingbusy?: ListingBusy;
}

interface ListingBusy extends Space {
    startDateTime: Date;
    endDateTime: Date;
    status: string;
}
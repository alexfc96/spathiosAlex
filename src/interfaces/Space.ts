export interface Space {
    listingID?: string;
    listingName: string;
    pricePerHour: number;
    listingBusy?: ListingBusy;
}

interface ListingBusy extends Space {
    startDateTime: Date;
    endDateTime: Date;
    status: string;
}
'use client';

interface ListingReservationProps {
  price: number;
  dateRange: Range,
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservations = () => {
  return(
    <div>

    </div>
  );
};

export default ListingReservations;
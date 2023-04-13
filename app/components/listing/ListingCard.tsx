'use client'
import { useRouter } from 'next/navigation';
import { Listing, Reservation } from '@prisma/client';
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import useCountries from '@/app/hooks/useCountries';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

import HeartButton from "../HeartButton";



interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({ data, reservation, onAction,
  disabled, actionLabel, actionId = '', currentUser }) => {

  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      //preventing bubbling
      e.stopPropagation();

      if (disabled) {
        return;
      }
      //action could be undefined
      onAction?.(actionId)
    }, [disabled, onAction, actionId]);

  //reservation data
  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  //price section
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        {/* acpect-square - sets w & h to be eequal */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="absolute top-3right-3"> 
            <HeartButton
              listingId={data.id}
              currentUser={currentUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
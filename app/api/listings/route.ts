import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
  //getting currentUser
  const currentUser = await getCurrentUser();
  if (!currentUser) { return NextResponse.error(); }
  //getting all fields from the form
  const body = await request.json();
  const { title, description, imageSrc, category, roomCount,
    bathroomCount, guestCount, location, price } = body;
  //check if any of the field is missing, if so, throw an error
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      NextResponse.error();
    }
  });

  //if all good, create a new listing 
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      //ensure that price is an integer
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  });
  return NextResponse.json(listing);
}
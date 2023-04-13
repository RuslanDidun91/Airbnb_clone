'use client'
import { useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from "./Modal";
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from '../navbar/Categories';
import CountrySelect from '../inputs/CountrySelect';


enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {

  const router = useRouter();
  const rentModal = useRentModal();

  //select category state
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  //destructed from useForm
  const category = watch('category');
  const location = watch('location');

  //due to setValue doesn't rerender the page in nextJs
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    });
  }


  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  //in case if last category
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create';
    }
    return 'Next';
  }, [step]);

  //in case if first category
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return 'Back';
  }, [step]);

  //will be changeble variable

  let bodyContent = (
    <div>
      <Heading
        title='Which is best describe your place?'
        subtitle='Pick a category'
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((c) => (
          <div key={c.label} className='col-span-1'>
            <CategoryInput
              onClick={(category) => setCustomValue('category', category)}
              selected={category === c.label}
              label={c.label}
              icon={c.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className='flex flex-col gap-8'>
        <Heading
          title='Where is it located?'
          subtitle='Help others to find you'
        />
        {/* country dropdown */}
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue('location', value)}
        />
        <Map 
        
        />
      </div>
    );
  };

  return (
    <div>
      <Modal
        title="Airbnb your home!"
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      />
    </div>
  );
};


export default RentModal;
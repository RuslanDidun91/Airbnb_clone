'use client'
import { useState, useMemo } from 'react';
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from '../navbar/Categories';


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

  const [step, setStep] = useState(STEPS.CATEGORY);

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
            onClick={() => {}}
            selected={false}
            label={c.label}
            icon={c.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );



  return (
    <div>
      <Modal
        title="Airbnb your home!"
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      />
    </div>
  );
};


export default RentModal;
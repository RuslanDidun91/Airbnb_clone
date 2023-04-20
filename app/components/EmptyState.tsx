'use client'
import { useRouter } from 'next/navigation';
import Button from "./Button";
import Heading from "./Heading";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
  title = 'No exact matches found',
  subtitle = 'Try to change the filters',
  showReset
}) => {

  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center ">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
  );
};


export default EmptyState;
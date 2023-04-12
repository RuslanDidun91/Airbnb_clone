'use client'
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import qs from 'query-string';


interface CategoryProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryProps> = ({ label, icon: Icon, selected }) => {

  const router = useRouter();
  const params = useSearchParams();


  const handleClick = useCallback(() => {
    //define an empty query
    let currentQuery = {};
    //look for params and parse them into string
    if (params) { currentQuery = qs.parse(params.toString()) }
    //spread all categoriess and add a label to category
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }
    //delete selected if clicked twice
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }
    //generate url string wich will icnlude / and updated query
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    router.push(url);
  }, [label, router, params]);

  return (
    <div onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2
        hover:text-neutral-800 transition cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}`}>
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
  );
};


export default CategoryBox;
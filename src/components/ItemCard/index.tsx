import Marquee from "react-fast-marquee";

import { Item } from "../../types/itemType";

type Props = {
  item: Item;
};

export default function ItemCard({ item }: Props) {
  return (
    <div
      className="col-span-1 rounded-lg overflow-hidden bg-cover bg-center w-full relative bg-blue-500 flex flex-col shadow-md shadow-gray-800"
      style={{
        backgroundImage: `url(${item.images.background})`,
      }}
    >
      <img src={item.images.item} alt={item.name} className="flex-1" />
      <div className="bg-gray-800 w-full">
        {item.name.length > 20 ? (
          <Marquee direction="left" speed={30} delay={0} pauseOnHover>
            <h3 className="text-white md:text-lg text-sm font-bold text-center pt-5 pb-3 whitespace-nowrap w-full">
              {item.name.toUpperCase()}
            </h3>
          </Marquee>
        ) : (
          <h3 className="text-white md:text-lg text-sm font-bold text-center pt-5 pb-3">
            {item.name.toUpperCase()}
          </h3>
        )}
        <div className="flex flex-row gap-2 justify-end items-center bg-gray-900 overflow-hidden p-2">
          <p className="text-lg text-center font-medium">{item.price}</p>
          <img
            src="https://fortnite-api.com/images/vbuck.png"
            alt="paVos"
            className="size-8 inline-block"
          />
        </div>
      </div>
    </div>
  );
}

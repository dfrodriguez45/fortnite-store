import React from 'react';
import { Item } from '../../models';
import styles from './styles/ItemCardLarge.module.css';
export interface ItemCardLargeProps {
	item: Item
}

const ItemCardLarge: React.FC<ItemCardLargeProps> = ({ item }) => {
	return <div className={styles.itemcardlarge}>
		<img src={item.images.featured} alt={item.name} className='hidden sm:inline-block w-[350px] h-full object-cover object-center' />
		<img src={item.images.icon} alt={item.name} className='sm:hidden w-[350px] h-full object-cover object-center' />
		<div className={`absolute -rotate-2 h-5 w-96 transform -translate-x-8 bottom-20 ${item.rarity}`} />
		<div className='bg-gray-800'>
			<h3 className='text-white text-xl font-primary text-center pt-5 pb-3'>{item.name}</h3>
			<div className='flex flex-row gap-2 justify-end items-center bg-gray-900 overflow-clip h-7'>
				<p className='text-lg font-primary text-center'>{item.price}</p>
				<img src="https://fortnite-api.com/images/vbuck.png" alt='paVos' className='w-10 h-10 inline-block' />
			</div>
		</div>
	</div>;
};

export default ItemCardLarge;

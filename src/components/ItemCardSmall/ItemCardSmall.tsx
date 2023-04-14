import React from 'react';
import { Item } from '../../models';
import styles from './styles/ItemCardSmall.module.css';
export interface ItemCardSmallProps {
	item: Item,
}

const ItemCardSmall: React.FC<ItemCardSmallProps> = ({ item }) => {
	return <div className={styles.itemcardsmall}>
		<img src={item.images.icon} alt={item.name} className='w-auto h-full object-cover object-center' />
		<div className={`absolute -rotate-2 h-5 w-96 bottom-20 ${item.rarity}`} />
		<div className='bg-gray-800 w-full'>
			<h3 className='text-white text-xl font-primary text-center pt-5 pb-3'>{item.name}</h3>
			<div className='flex flex-row gap-2 justify-end items-center bg-gray-900 overflow-clip h-7'>
				<p className='text-lg font-primary text-center'>{item.price}</p>
				<img src="https://fortnite-api.com/images/vbuck.png" alt='paVos' className='w-10 h-10 inline-block' />
			</div>
		</div>
	</div>;
};

export default ItemCardSmall;

import React from 'react';
import { Item } from '../../models';
import { ItemCardLarge } from '../ItemCardLarge';
import { ItemCardSmall } from '../ItemCardSmall';
import styles from './styles/DailyShop.module.css';
export interface DailyShopProps {
	data: Item[],
}

const DailyShop: React.FC<DailyShopProps> = ({ data }) => {
	return <div className='flex-1 bg-transparent p-5 overflow-clip'>
			<h2 className='text-white text-4xl font-primary mb-5'>DIARIO</h2>
			<div className='grid sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 gap-4'>
				{data?.slice(0, 2).map((item: Item) => (
					<ItemCardLarge key={item.id} item={item} />
				))}
				{data?.slice(2).map((item: Item) => (
					<ItemCardSmall key={item.id} item={item} />
				))}
			</div>
		</div>;
};

export default DailyShop;

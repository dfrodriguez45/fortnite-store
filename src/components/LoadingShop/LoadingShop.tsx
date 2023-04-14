import React from 'react';
import styles from './styles/LoadingShop.module.css';
export interface LoadingShopProps {}

const LoadingShop : React.FC<LoadingShopProps> = () => {
	return <div className='flex-1 bg-transparent p-5 overflow-clip'>
		<div className='animate-pulse bg-gray-700 rounded-full w-60 h-8 mb-5' />
		<div className='grid sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 gap-4'>
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-2 h-[327px] sm:h-[846px] w-[327px]' />
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-2 h-[327px] sm:h-[846px] w-[327px]' />
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-1 h-full w-full' />
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-1 h-full w-full' />
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-1 h-full w-full' />
			<div className='animate-pulse bg-gray-700 rounded-lg col-span-1 row-span-1 h-full w-full' />
		</div>
	</div>;
};

export default LoadingShop;

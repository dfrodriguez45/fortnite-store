import React from 'react';
import styles from './styles/LoadingShop.module.css';
export interface LoadingShopProps {}

const LoadingShop : React.FC<LoadingShopProps> = () => {
	return <div className='flex-1 bg-transparent p-5 overflow-clip'>
		<div className='animate-pulse bg-gray-700 rounded-full w-60 h-8 mb-5' />
		<div className='grid sm:grid-cols-2 sm:grid-rows-4 lg:grid-cols-4 lg:grid-rows-2 gap-4'>
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
			<div className='animate-pulse bg-gray-700 w-60 h-96' />
		</div>
	</div>;
};

export default LoadingShop;

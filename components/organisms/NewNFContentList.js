import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ProgressViewIOSComponent
} from 'react-native';

import { NFImage } from '../atoms/index';
import { NavButtons } from '../molecules/index';

import { DUMMY_ITEMS } from '../../data/DUMMY_DATA';

export const NewNFContentList = (props) => {
	const onLoadNext = () => {
		console.log('onNext');
	};

	const onLoadPrevious = () => {
		console.log('onPrevious');
	};

	const onItemSelectedHandler = (item) => {
		props.navData.navigate('ItemDetail', { item: item });
	};

	const renderNFItemImage = (itemData) => {
		return (
			<NFImage
				imageUrl={itemData.item.img}
				onSelectNFItem={() => {
					onItemSelectedHandler(itemData.item);
				}}
			/>
		);
	};

	return (
		<View style={styles.screen}>
			<NavButtons
				onNextHandler={onLoadNext}
				onPreviousHandler={onLoadPrevious}
			/>
			<View style={styles.list}>
				<FlatList
					// data={props.listData}
					// numColumns={2}
					data={DUMMY_ITEMS}
					keyExtractor={(item, index) => item.nfid.toString()}
					renderItem={renderNFItemImage}
					style={{ width: '100%' }}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flexDirection: 'column',
		backgroundColor: 'green'
	},
	list: {
		flex: 1,
		justifyContent: 'flex-start',
		// flexWrap: 'wrap',
		padding: 10
	}
});

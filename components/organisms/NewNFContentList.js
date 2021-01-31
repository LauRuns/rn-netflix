import React from 'react';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';

import { NFImage } from '../atoms/index';
import { NavButtons } from '../molecules/index';
import Colors from '../../constants/Colors';

/* Returns a list of new Netflix items and the navigation buttons for loading the next and previous set of items */
export const NewNFContentList = (props) => {
	const onItemSelectedHandler = (item) => {
		props.navData.navigate('ItemDetail', { item: item });
	};

	/* Returns the new Netflix item as a <NFImage /> component */
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
			<NavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
			<SafeAreaView style={styles.list}>
				<FlatList
					data={props.listData}
					numColumns={2}
					keyExtractor={(item, index) => item.nfid.toString()}
					renderItem={renderNFItemImage}
					contentContainerStyle={{
						paddingBottom: 50
					}}
				/>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: Colors.backgroundDark
	},
	list: {
		alignItems: 'center'
	}
});

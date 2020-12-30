import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';

import { NavButtons, ExpNFItem } from '../molecules/index';
import { DUMMY_ITEMS } from '../../data/DUMMY_DATA';

export const ExpNFContentList = (props) => {
	const renderNFItemImage = (itemData) => {
		console.log('itemData', itemData.item);
		return <ExpNFItem item={itemData.item} navData={props.navData} />;
	};

	return (
		<View style={styles.screen}>
			<NavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
			<SafeAreaView style={styles.list}>
				<FlatList
					data={props.listData}
					// data={DUMMY_ITEMS}
					numColumns={2}
					keyExtractor={(item, index) => item.netflixid.toString()}
					// keyExtractor={(item, index) => item.nfid.toString()}
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

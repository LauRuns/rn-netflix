import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import Colors from '../../constants/Colors';

import { NavButtons, ExpNFItem } from '../molecules/index';
import { DUMMY_ITEMS } from '../../data/DUMMY_DATA';

export const ExpNFContentList = (props) => {
	return (
		<View style={styles.screen}>
			<NavButtons onNext={props.onNext} onPrevious={props.onPrevious} />
			<SafeAreaView style={styles.list}>
				<FlatList
					data={props.listData}
					numColumns={2}
					keyExtractor={(item, index) => item.netflixid.toString()}
					renderItem={(itemData) => (
						<ExpNFItem item={itemData.item} navData={props.navData} />
					)}
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

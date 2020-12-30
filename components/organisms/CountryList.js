import React from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';

import { CountryCard } from '../molecules/index';

export const CountryList = (props) => {
	return (
		<View>
			<SafeAreaView style={styles.safeView}>
				<FlatList
					data={props.countries}
					keyExtractor={(item, index) => item.countryId.toString()}
					renderItem={(itemData) => (
						<CountryCard
							country={itemData.item.country}
							showNewContent={() => props.showCountryNewContent(itemData.item)}
							showExpContent={() => props.showCountryExpContent(itemData.item)}
						/>
					)}
				/>
			</SafeAreaView>
		</View>
	);
};

const styles = StyleSheet.create({
	safeView: {}
});

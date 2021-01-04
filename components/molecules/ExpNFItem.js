import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useNetflixClient } from '../../shared/hooks/netflix-hook';

import { NFImage } from '../atoms/index';
import { Spinner } from '../molecules/Spinner';
import Colors from '../../constants/Colors';
import { DUMMY_SINGLE_SEARCH_RESULT } from '../../data/DUMMY_DATA';
export const ExpNFItem = (props) => {
	const [expItem, setExpItem] = useState(null);
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();

	const onItemSelectedHandler = (item) => {
		props.navData.navigate('ItemDetail', { item: item });
	};

	const fetchExpItem = async () => {
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'title',
				params: {
					netflixid: props.item.netflixid
				}
			});
			console.log(response[0]);
			setExpItem(response[0]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchExpItem();
		// setExpItem(DUMMY_SINGLE_SEARCH_RESULT[0]); // <-- for use with development
	}, []);

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Loading new content..."
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View style={styles.screen}>
			{expItem && (
				<NFImage
					imageUrl={expItem.img}
					onSelectNFItem={() => {
						onItemSelectedHandler(expItem);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		// flex: 1
	}
});

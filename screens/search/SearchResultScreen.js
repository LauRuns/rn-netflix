import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';

import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { DefaultText, IconButton, NFImage } from '../../components/atoms';
import { Spinner } from '../../components/molecules/index';
import Colors from '../../constants/Colors';

import { DUMMY_SEARCH_RESULTS } from '../../data/DUMMY_DATA';

export const SearchResultScreen = (props) => {
	const {
		query,
		contentType,
		startyear,
		endyear,
		countryId
	} = props.route.params.queryParams;
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();

	const [searchResults, setSearchResults] = useState(null);
	const [noResults, setNoResults] = useState(null);

	let searchParams = {
		query: query,
		offset: 0,
		start_year: startyear,
		orderby: 'date',
		countrylist: countryId,
		audio: 'english',
		type: contentType,
		end_year: endyear
	};

	useEffect(() => {
		const fetchSearchData = async () => {
			try {
				const searchResponse = await fetchNetflixData({
					urlEndpoint: 'search',
					params: searchParams
				});

				if (!searchResponse) {
					setNoResults(true);
				} else {
					setSearchResults(searchResponse);
				}
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};

		// fetchSearchData();
		setSearchResults(DUMMY_SEARCH_RESULTS); // <-- use in development
	}, []);

	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	if (isLoading) {
		return (
			<Spinner
				spinnerSize="large"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
				spinnerText="Loading results..."
			/>
		);
	}

	if (!isLoading && noResults) {
		return (
			<View style={styles.noResults}>
				<DefaultText
					color={Colors.primary}
					size={20}
					style={{ textAlign: 'center' }}
				>
					...oops! Looks like there is no result for {query} between years{' '}
					{startyear} - {endyear}.
				</DefaultText>
				<DefaultText
					size={20}
					style={{ textAlign: 'center', marginTop: 20 }}
					color={Colors.primary}
				>
					Maybe try a different search query?
				</DefaultText>
				<IconButton
					before
					iconName="arrow-back"
					iconSize={24}
					color={Colors.primary}
					textSize={20}
					btnText="New search"
					style={{ marginTop: 20 }}
					onPress={() => {
						console.log('try new serach query'),
							props.navigation.navigate('Search');
					}}
				/>
			</View>
		);
	}

	const onItemSelectHandler = (e) => {
		props.navigation.navigate('ItemDetail', {
			item: e
		});
	};

	return (
		<View style={styles.screen}>
			<FlatList
				data={searchResults}
				keyExtractor={(item) => item.id}
				numColumns={3}
				renderItem={(itemData) => (
					<NFImage
						imageStyle={{
							width: 100,
							height: 150
						}}
						resizeMode="contain"
						imageUrl={itemData.item.img}
						onSelectNFItem={() => onItemSelectHandler(itemData.item)}
					/>
				)}
			/>
		</View>
	);
};

export const searchResultScreenOptions = (navData) => {
	return {
		headerTitle: 'Results'
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.backgroundDark
	},
	noResults: {
		flex: 1,
		backgroundColor: Colors.backgroundDark,
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		padding: 20
	}
});

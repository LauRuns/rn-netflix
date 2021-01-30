import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert, FlatList } from 'react-native';
/* UI elements, components, hooks and styling */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { DefaultText, IconButton, NFImage } from '../../components/atoms';
import { Spinner } from '../../components/molecules/index';
import Colors from '../../constants/Colors';

/*
Returns the screen containing the search results.
Gets the search parameters from the params on the route from the searchForm.
Enables selecting an item and naviagting to it's details.
*/
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

	/* Set a searchParam object that is passed to the API endpoint. 'orderby' and 'audio' are set hardcoded. Other options are available: check the API documentation at rapidapi.com */
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

	/* Fetches the search results when the component is mounted */
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

		fetchSearchData();
	}, []);

	/* If the error property is set, a pop-up showing the error message wil be opened */
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

	/* If the searchquery has no results, then the user is notified and given the option to return to the search screen for another search */
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

	/* When a search result item is pressed, it navigates to the detail screen */
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

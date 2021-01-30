import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
/* UI elements, components, hooks and styling */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { Spinner } from '../../components/molecules/index';
import { NewNFContentList } from '../../components/organisms/index';
import Colors from '../../constants/Colors';

/* Returns a list of new Netflix item for the country ID that is passed in as props. */
export const NewContent = (props) => {
	const { countryId } = props.route.params.countryData;
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [newItems, setNewItems] = useState(0);

	/* Sets a searchParam object for fetching new items. */
	let searchParams = {
		newdate: new Date('2015-01-01'), // returns all titles with a new date greater than this
		start_year: 2015, // optional - returns items as of this year
		orderby: 'date',
		limit: 6,
		countrylist: countryId, // ID is passed in on the route via props
		audio: 'english',
		offset: offset, // control the offset with the navButtons - allows fetching next or previous items
		end_year: 2021
	};

	/* Fetches new content and sets in state. When set the <NewNFContentList /> is rendered */
	const fetchNewContent = async () => {
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'search',
				params: searchParams
			});
			setNewItems(response);
		} catch (error) {
			console.log(error);
		}
	};

	/* Loads the new content when the offset property changes value when the user presses the <NavButtons /> */
	useEffect(() => {
		fetchNewContent();
	}, [offset]);

	/* If the error property is set, a pop-up showing the error message wil be opened */
	useEffect(() => {
		if (error) {
			Alert.alert('Error', error, [
				{ text: 'OK', onPress: () => clearError() }
			]);
		}
	}, [error]);

	/* Loads the next 6 items */
	const onLoadNext = () => {
		setOffset(offset + 6);
	};

	/* Loads the previous 6 items, unless the offset === 0. In that case the previous button is disabled. */
	const onLoadPrevious = () => {
		if (offset !== 0) setOffset(offset - 6);
	};

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
			{newItems && (
				<NewNFContentList
					listData={newItems}
					onNext={onLoadNext}
					onPrevious={onLoadPrevious}
					navData={props.navigation}
				/>
			)}
		</View>
	);
};

export const newcontentScreenOptions = (navData) => {
	const { country } = navData.route.params.countryData;
	return {
		headerTitle: `${country} new content`
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1
	}
});

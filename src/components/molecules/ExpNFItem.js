import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* UI elements and components */
import { NFImage } from '../atoms/index';
import { Spinner } from '../molecules/Spinner';
import Colors from '../../constants/Colors';

/*
Returns a expiring Netflix item. Takes in a id property for which it fisrt needs to fetch the data. When bussy fetchuing data a loading spinner is displayed.
When the data has been fetched, the item is displyed as a <NFImage /> component, which navigates to the detail page for the item on touch.
*/

export const ExpNFItem = (props) => {
	const [expItem, setExpItem] = useState(null);
	const { isLoading, fetchNetflixData, clearError } = useNetflixClient();

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

			setExpItem(response[0]);
		} catch (error) {
			// Error is handled and set by the useNetflixClient
		}
	};

	useEffect(() => {
		fetchExpItem();
	}, []);

	if (isLoading) {
		return (
			<Spinner
				spinnerText="Loading..."
				spinnerSize="small"
				spinnerColor={Colors.primary}
				spinnerTextColor={Colors.primary}
			/>
		);
	}

	return (
		<View>
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

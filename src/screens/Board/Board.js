import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {backgroundColor, paddingHorizontal} from '../../styles';
import {fetchAllData} from '../../store/routines/dataRoutines';
import {
  getColumnIsLoading,
  getColumns,
} from '../../store/selectors/columnSelector';
import ColumnItem from './ColumnItem/ColumnItem';
import Splash from '../Splash/Splash';
import {getIsAuth} from '../../store/selectors/authSelector';

const Board = ({navigation}) => {
  const dispatch = useDispatch();
  const columns = useSelector(getColumns);
  const isAuth = useSelector(getIsAuth);
  const isLoading = useSelector(getColumnIsLoading);

  useEffect(() => {
    if (!isLoading && !columns && isAuth) {
      dispatch(fetchAllData());
    }
  });

  const handleOnClick = (column) => () => {
    navigation.navigate('Column', {columnId: column.id});
  };

  return isLoading || !columns ? (
    <Splash />
  ) : (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        {columns.map((column) => (
          <ColumnItem
            key={column.id}
            column={column}
            handleOnClick={handleOnClick(column)}
          />
        ))}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: paddingHorizontal,
    paddingVertical: 5,
  },
});

export default Board;

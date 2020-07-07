import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {backgroundColor, paddingHorizontal} from '../../styles';
import {fetchColumn} from '../../routines/columnRoutines';
import {getColumns} from '../../selectors/columnSelector';
import ColumnCard from '../../components/ColumnCard/ColumnCard';
import Splash from '../Splash/Splash';

const Board = () => {
  const dispatch = useDispatch();
  const {data: columns, loading} = useSelector(getColumns);

  useEffect(() => {
    dispatch(fetchColumn());
  }, [dispatch]);

  return loading ? (
    <Splash />
  ) : (
    <ScrollView style={styles.scrollView}>
      <SafeAreaView style={styles.container}>
        {columns.map((column) => (
          <ColumnCard key={column.id} column={column} />
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

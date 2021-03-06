import React, {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {inactiveColor, secondColor} from '../../styles';
import {useSelector} from 'react-redux';
import {getFilterColumnCards} from '../../store/selectors/cardSelector';
import CardList from './CardList/CardList';
import PropTypes from 'prop-types';
import {getColumnById} from '../../store/selectors/columnSelector';

const Tab = createMaterialTopTabNavigator();
export const ColumnContext = React.createContext();

const Column = ({
  navigation,
  route: {
    params: {columnId},
  },
}) => {
  const column = useSelector(getColumnById({id: columnId}));
  const {checkedCards, uncheckedCards} = useSelector(
    getFilterColumnCards({id: columnId}),
  );

  useEffect(() => {
    navigation.setOptions({title: column.title, columnId: column.id});
  }, [column, navigation]);

  return (
    <ColumnContext.Provider value={{checkedCards, uncheckedCards, column}}>
      <Tab.Navigator
        swipeEnabled={false}
        tabBarOptions={{
          activeTintColor: secondColor,
          inactiveTintColor: inactiveColor,
          indicatorStyle: {
            backgroundColor: secondColor,
          },
        }}>
        <Tab.Screen
          name="CHECKED CARDS"
          component={CardList}
          initialParams={{
            isChecked: true,
            isShowInput: true,
          }}
        />
        <Tab.Screen
          name="UNCHECKED CARDS"
          component={CardList}
          initialParams={{
            isChecked: false,
            isShowInput: false,
          }}
        />
      </Tab.Navigator>
    </ColumnContext.Provider>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  }),
};

export default Column;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieApi from "./data/api"
import {Movie} from "./data/model/model"



interface IState {
  movies: Array<Movie>;
}

export default class App extends React.Component<IState> {
  constructor(props) {
    super(props)
    this.state = {
      movies:[]
    }
  }

  async componentWillMount() {
      MovieApi.getTrendingMovies(1).then(movies=>{
        this.setState({movies})
      }).catch(err=>{
        console.warn(err)
        this.setState({movies:[]})

      });
      
  }

  render() {
    const movieRows = [];
    this.state.movies.forEach(movie=>{movieRows.push((
      <View style={{borderWidth:1, borderColor: "black", padding: 8}}>
        <Text style={{fontSize:24}} numberOfLines={1}>{movie.title}</Text>
      </View>
    ))});

    return (
      <View style={styles.container}>
        <View style={{marginVertical:32}}>
          <Text style={{fontSize:48}}>Popular Movies</Text>
        </View>
        {movieRows}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
});

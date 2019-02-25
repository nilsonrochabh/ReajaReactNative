import React,{Component} from 'react';

import api from '../services/api';

import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
export default class Main extends Component{

    static navigationOptions={
        title:'Reaja'
    };
    state={
        productsInfo:{},
        docs:[],
        page:1
    };
    componentDidMount(){
        this.loadProducts();
    }
    loadProducts = async (page = 1)=>{
        const response = await api.get( `/products?page=${page}`);

        const{ docs, ...productsInfo } = response.data;

        //unir os docs atuais com os que serão carregados 
        //page, serve para atualizar as paginas 
        this.setState({ docs:[...this.state.docs, ...docs], 
            productsInfo,page })
    };
    renderItem =({item}) =>(
        <View style={styles.productsContainer}>
            <Text style={styles.productsTitle}>{item.title}</Text>
            <Text style={styles.productsDescripton}>{item.descripton}</Text>

            <TouchableOpacity 
                style={styles.productsButton} 
                onPress={() => {
                    //abrindo a pagina e enviando parametros
                    this.props.navigation.navigate("Product",{product:item});
                }}
            >
                <Text style={styles.productsButtonText}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )
    loandMore =() =>{
        const {page, productsInfo} = this.state;
        //pagina igual o numero total de pagina não faz nada
        if (page === productsInfo) return;

        //se não 
        const PageNumber = page + 1;

        this.loadProducts(PageNumber);


    };
    render (){
    return(
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={this.state.docs}
                keyExtractor={item => item._id}
                renderItem={this.renderItem}
                onEndReached={this.loandMore}
                onEndReachedThreshold={0.1}                
                />

        </View>

    );
    }
    

}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fafafa"
    },
    list:{
        padding: 20
    },
    productsContainer:{
        backgroundColor:"#FFF",
        borderWidth:1,
        borderColor:"#DDD",
        borderRadius:5,
        padding: 20,
        marginBottom:20
    },
    productsTitle:{
        fontSize:18,
        fontWeight:"bold",
        color:"#333"
        
    },
    productsDescripton:{
        fontSize: 16,
        color:"#999",
        marginTop:5,
        lineHeight:24
    },
    productsButton:{
        height:42,
        borderRadius:5,
        borderWidth:2,
        borderColor:"#DA552f",
        backgroundColor: "transparent",
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    productsButtonText:{
        fontSize:16,
        color:"#DA552F",
        fontWeight:'bold'
    }
 

});
import React from 'react';
import { useEffect } from 'react';


export const Trie =(props)=>{

useEffect(()=>{class Node {
    constructor(){
        this.childrens={};
        this.isWord=false;
    }
}    
class Trie{
    constructor(){

        this.root=new Node();
    }
   insert(value){
if(!value){
    throw new Error('Value is undefined');
}



    let wordToProcess=value.toLowerCase().split('');
    for(let elem of wordToProcess){
       if(elem in this.root.childrens===false){
         let node = new Node();
          if(elem===wordToProcess[wordToProcess.length-1]){
                node.isWord=true;
          }
          this.root.childrens[elem]=node;
       } 
    }

    
   }
   printRoot(){
    console.log(this.root);
   }
}

let first =new Trie();
try {
    first.insert(props.value);
} catch (error) {
    console.log(error.message);
}
first.printRoot();
},[props.word])



    return(<div>
        <h1>Trie data </h1>
    </div>)
}